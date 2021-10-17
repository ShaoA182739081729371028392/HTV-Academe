alert("dajslkkjlsad is taking notes now!");
class Rect {
    constructor(x, y, width, height, value = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
    }
}

class Canvas {
    constructor(canvas_id, onSelected) {
        this.canvas_id = canvas_id;
        this.selecting = false;
        this.start_coord = { x: 0, y: 0 };
        this.onSelected = onSelected;

        this.selectedRect = new Rect(0, 0, 0, 0);
        this.rects = [];
        this.renderedRects = [];
    }

    showRects(rects) {
        this.clear();
        let video = document.querySelector("video");

        for (var i = 0; i < rects.length; i++) {
            let rect = rects[i];
            if (rect.value) {
                console.log(rect);
                let text = document.createElement("div");
                text.style.position = "absolute";
                text.style.zIndex = 8;
                text.innerHTML = rect.value;
                text.style.left = rect.x + video.getBoundingClientRect().left + "px";
                text.style.top = rect.y + video.getBoundingClientRect().top + "px";
                text.style.textAlign = "center";
                text.style.color = "transparent";
                text.style.cursor = "text";
                text.style.userSelect = "text";

                text.style.fontSize = `${rect.height}px`;
                document.body.appendChild(text);

                console.log(text);
                this.renderedRects.push(text);
            }
        }
        this.rects = rects;
    }

    clear() {
        this.renderedRects.forEach((val) => {
            document.body.removeChild(val);
        });

        this.renderedRects = [];
        this.rects = [];
        this.selectedRect = new Rect(0, 0, 0, 0);
    }

    startSelection(event) {
        let canvas = document.getElementById(this.canvas_id);

        this.start_coord.x = event.clientX - canvas.getBoundingClientRect().left;
        this.start_coord.y = event.clientY - canvas.getBoundingClientRect().top;
    }

    whileSelecting(event) {
        if (!this.selecting) return;

        let canvas = document.getElementById(this.canvas_id);
        let ctx = canvas.getContext("2d");
        canvas.style.pointerEvents = "auto";

        let width = event.clientX - canvas.getBoundingClientRect().left - this.start_coord.x;
        let height = event.clientY - canvas.getBoundingClientRect().top - this.start_coord.y;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(129, 207, 224, 0.4)";
        ctx.fillRect(this.start_coord.x, this.start_coord.y, width, height);
    }

    endSelection(event) {
        this.selecting = false;
    }
}

async function getAPI(data) {
    data = data.substr(22);
    let res = await fetch("http://localhost:3000/api/ocr", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: data }),
    });
    const content = await res.json();
    console.log("Request completed with: ", content);
    /*
      let response = {
          lines: [
              {
                  bounding_box: {
                      x: 50,
                      y: 100,
                      width: 200,
                      height: 200
                  },
                  text: "text"
              }
          ]
      };
      */
    return content;
}

function main() {
    var ghost = document.createElement("canvas");
    ghost.id = "ghost";
    ghost.style.position = "absolute";
    //   ghost.style.opacity = "0";
    document.body.appendChild(ghost);

    let canvas = new Canvas("CursorLayer", (r) => {
        console.log(r);
    });
    // resize_canvas(video);
    document.addEventListener("mousedown", function (e) {
        // canvas.startSelection(e);
    });
    document.addEventListener("mouseup", function (e) {
        canvas.endSelection(e);
    });
    document.addEventListener("mousemove", function (e) {
        canvas.whileSelecting(e);
    });

    setInterval(async function () {
        console.log("RUNNING MAIN");
        let video = document.querySelector("video");
        // resize_canvas(video);
        let stream = video.captureStream();
        let imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
        let frame = await imageCapture.grabFrame();

        var offScreenCanvas = document.getElementById("ghost");
        var context = offScreenCanvas.getContext("bitmaprenderer");
        const [frameWidth, frameHeight] = [frame.width, frame.height];
        context.transferFromImageBitmap(frame);
        var dataURL = offScreenCanvas.toDataURL();

        console.log(dataURL);

        var selectedRects = [];
        let response = await getAPI(dataURL);

        response.lines.forEach((line) => {
            const boundaryBox = line.boundingBox;
            const [width, height] = [video.offsetWidth, video.offsetHeight];
            console.log(width, height, frameWidth, frameHeight);
            const wScale = width / frameWidth;
            const hScale = height / frameHeight;
            selectedRects.push(
                new Rect(
                    Math.round(boundaryBox.x * wScale),
                    Math.round(boundaryBox.y * hScale),
                    boundaryBox.width * wScale,
                    boundaryBox.height * hScale,
                    line.text
                )
            );
        });

        canvas.showRects(selectedRects);
    }, 5000);
}
main();

window.onresize = () => {
    let video = document.querySelector("video");
};