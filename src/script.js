function readFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}

function onFilesSelected (e) {
  let files = (e.dataTransfer || e.target).files;
  for (let index = 0; index < files.length; index++) {
    let file = files[index]

    readFile(file).then(src => {
      APP.images.push({
        src: src,
        name: file.name,
      })
    }).catch(console.error)
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function setDimensions(w, h, el) {
  el.style.width = w + 'px';
  el.style.height = h + 'px';
}

function drag(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, moveItem);
  }
}

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;

  APP.onDragEnd(moveItem)
}

var moveItem;
var dragItem;
var container;

var currentX;
var currentY;
var initialX;
var initialY;

var xOffset = 0;
var yOffset = 0;

var active = false;

var defaultLabelWH = 40;
var defaultCoords = {
  x: 10,
  y: 10,
  width: defaultLabelWH,
  height: defaultLabelWH,
}

var APP = new Vue({
  el: '#app',
  created: function () {},
  data: {
    current: 0,
    label: '',
    images: [],
    completed: [],
    fromCenter: false,

    currentLabelX: 0,
    currentLabelY: 0,
    currentLabelW: defaultLabelWH,
    currentLabelH: defaultLabelWH,

    currentImageW: 900,
    currentImageH: 600,

    activeTool: 'rect',
    activeColor: 'ann-blue',
  },
  methods: {
    onFilesSelected: (e) => {
      onFilesSelected(e)
    },

    onImageLoad: function (e, index) {
      let $image = e.target
      let image = APP.images[index]

      image.width = $image.width
      image.height = $image.height
    },

    onImageChange: function () {
      let image = APP.images[APP.current]

      APP.currentImageW = image.width
      APP.currentImageH = image.height

      let coords = image.coordinates || defaultCoords

      APP.currentLabelW = coords.width
      APP.currentLabelH = coords.height

      xOffset = coords.x
      yOffset = coords.y
      setTranslate(coords.x, coords.y, moveItem)
      setDimensions(coords.width, coords.height, moveItem)

      APP.label = image.label || ''
    },

    onLabelChange: function () {
      let image = APP.images[APP.current]
      image.label = APP.label

      let coordinates = {
        x: APP.currentLabelX ,
        y: APP.currentLabelY,
        width: APP.currentLabelW,
        height: APP.currentLabelH,
      }

      image.coordinates = coordinates

      let done = APP.completed

      done[APP.current] = {
        image: image.name,
        annotations: [
          {
            label: image.label,
            coordinates: coordinates
          }
        ]
      }

      APP.completed = []
      done.forEach(item => {
        APP.completed.push(item)
      })
    },

    nextImage: function () {
      let next = APP.current + 1
      if (next > APP.images.length - 1) {
        next = 0
      }

      APP.current = next
      APP.onImageChange()
    },

    prevImage: function () {
      let prev = APP.current - 1
      if (prev < 0) {
        prev = APP.images.length - 1
      }

      APP.current = prev
      APP.onImageChange()
    },

    onDragEnd: function (e) {
      APP.currentLabelW = parseInt(e.style.width) || defaultLabelWH
      APP.currentLabelH = parseInt(e.style.height) || defaultLabelWH

      APP.currentLabelX = APP.fromCenter ? xOffset + Math.round(APP.currentLabelW/2) : xOffset
      APP.currentLabelY = APP.fromCenter ? yOffset + Math.round(APP.currentLabelH/2) : yOffset
    },

    onDragOver: (e) => {
      e.dataTransfer.dropEffect = 'copy'
    },

    onDrop: (e) => {
      onFilesSelected(e)
    },
  }
})


document.addEventListener('DOMContentLoaded', () => { // check support for arrow functions
  document.getElementById('browser-request').classList.add('hidden')

  moveItem = document.getElementById('moveitem');
  dragItem = document.getElementById('dragitem');
  container = document.getElementById('draglayer');

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  dragItem.addEventListener("mousedown", () => {
    active = true
  }, false);
  dragItem.addEventListener("mouseup", () => {
    active = false
  }, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);
})