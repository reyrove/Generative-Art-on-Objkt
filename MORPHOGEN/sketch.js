/*
  WOVEN / 01
  REYROVE
  Generative Textile Painting

  Core idea:

  ORDER
      ↓
  DISTORTION
      ↓
  CONTROLLED CHAOS

  The system creates:

  1. A dominant compositional axis
  2. Large color fields
  3. Medium geometric structures
  4. Sparse micro details
  5. Controlled asymmetry
  6. A limited palette

  Every seed generates a different composition,
  while following the same visual grammar.
*/


let seed;
let dna;

let palette;


/* =========================================================
   PALETTES
========================================================= */

const palettes = [

  {
    name: "OXIDE",
    colors: [
      "#120B08",
      "#54231B",
      "#8F3F2D",
      "#C76B3E",
      "#D9A45B",
      "#EEE0C2"
    ]
  },

  {
    name: "LAPIS",
    colors: [
      "#061018",
      "#0D2B45",
      "#155477",
      "#287E9D",
      "#6BB4C2",
      "#E7DFC5"
    ]
  },

  {
    name: "SAFFRON",
    colors: [
      "#110D06",
      "#56370E",
      "#936016",
      "#CA8F25",
      "#E1C15B",
      "#F0E4C3"
    ]
  },

  {
    name: "MOSS",
    colors: [
      "#081009",
      "#1D3222",
      "#34543A",
      "#5F774D",
      "#A1A675",
      "#DAD3B4"
    ]
  },

  {
    name: "PLUM",
    colors: [
      "#100911",
      "#35203D",
      "#59345C",
      "#7D4D73",
      "#B17B9F",
      "#E4CFDA"
    ]
  },

  {
    name: "CYAN",
    colors: [
      "#051013",
      "#0A3840",
      "#0C626B",
      "#15929A",
      "#6BC5C0",
      "#E2DDC5"
    ]
  }

];


/* =========================================================
   SETUP
========================================================= */

function setup() {

  const size = min(windowWidth, windowHeight);

  const canvas = createCanvas(size, size);

  canvas.parent("canvas-container");

  pixelDensity(1);

  /*
    Temporary seed generation.

    Later, for the Art Blocks version,
    this will be replaced by the token hash.
  */

  seed = floor(random(1000000000));

  randomSeed(seed);
  noiseSeed(seed);

  dna = createDNA();

  palette = dna.palette;

  document.getElementById("seed-value").textContent = seed;

  document.getElementById("dna-info").textContent =
    dna.structure +
    " · " +
    palette.name;

  noLoop();
}


/* =========================================================
   DNA
========================================================= */

function createDNA() {

  randomSeed(seed);

  return {

    palette: random(palettes),

    structure: random([
      "DIAGONAL",
      "FLOW",
      "SPLIT",
      "ORBITAL",
      "FIELD"
    ]),

    symmetry: random([
      4,
      5,
      6,
      8
    ]),

    scale: random(
      0.75,
      1.35
    ),

    distortion: random(
      0.04,
      0.20
    ),

    density: random(
      0.35,
      0.68
    ),

    detail: floor(
      random(
        3,
        7
      )
    ),

    rotation: random(
      -0.35,
      0.35
    ),

    fieldCount: floor(
      random(
        3,
        6
      )
    ),

    accent: random(
      0.15,
      0.45
    )

  };
}


/* =========================================================
   MAIN DRAW
========================================================= */

function draw() {

  background(
    palette.colors[0]
  );

  push();

  translate(
    width / 2,
    height / 2
  );

  rotate(
    dna.rotation
  );

  /*
    Layer 1
    Large compositional fields
  */

  drawColorFields();


  /*
    Layer 2
    Dominant geometric gesture
  */

  drawMainStructure();


  /*
    Layer 3
    Medium geometry
  */

  drawMediumGeometry();


  /*
    Layer 4
    Sparse textile details
  */

  drawMicroDetails();


  /*
    Layer 5
    Fine finishing marks
  */

  drawAccents();

  pop();
}


/* =========================================================
   COLOR FIELDS
========================================================= */

function drawColorFields() {

  randomSeed(
    seed + 1000
  );

  const count =
    dna.fieldCount;

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      TWO_PI *
      i /
      count +
      random(
        -0.6,
        0.6
      );

    const distance =
      random(
        width * 0.05,
        width * 0.32
      );

    const x =
      cos(angle) *
      distance;

    const y =
      sin(angle) *
      distance;

    const w =
      random(
        width * 0.22,
        width * 0.55
      );

    const h =
      random(
        height * 0.12,
        height * 0.42
      );

    const colorIndex =
      floor(
        random(
          1,
          palette.colors.length - 1
        )
      );

    const c =
      color(
        palette.colors[
          colorIndex
        ]
      );

    /*
      Low alpha gives us
      layered paint rather than
      solid blocks.
    */

    c.setAlpha(
      random(
        80,
        175
      )
    );

    fill(c);

    noStroke();

    push();

    translate(
      x,
      y
    );

    rotate(
      random(
        -0.8,
        0.8
      )
    );

    drawOrganicField(
      w,
      h,
      i
    );

    pop();
  }
}


/* =========================================================
   ORGANIC FIELD
========================================================= */

function drawOrganicField(
  w,
  h,
  index
) {

  beginShape();

  const points = 18;

  for (
    let i = 0;
    i <= points;
    i++
  ) {

    const t =
      i /
      points;

    const angle =
      t *
      TWO_PI;

    const nx =
      cos(angle);

    const ny =
      sin(angle);

    const distortion =
      noise(
        i * 0.25,
        index * 2,
        seed * 0.000001
      );

    const rx =
      w *
      0.5 *
      (0.82 + distortion * 0.35);

    const ry =
      h *
      0.5 *
      (0.82 + distortion * 0.35);

    vertex(
      nx * rx,
      ny * ry
    );
  }

  endShape(
    CLOSE
  );
}


/* =========================================================
   MAIN STRUCTURE
========================================================= */

function drawMainStructure() {

  randomSeed(
    seed + 2000
  );

  stroke(
    palette.colors[
      palette.colors.length - 1
    ]
  );

  noFill();

  /*
    Large composition
  */

  if (
    dna.structure === "DIAGONAL"
  ) {

    drawDiagonalStructure();

  } else if (
    dna.structure === "FLOW"
  ) {

    drawFlowStructure();

  } else if (
    dna.structure === "SPLIT"
  ) {

    drawSplitStructure();

  } else if (
    dna.structure === "ORBITAL"
  ) {

    drawOrbitalStructure();

  } else {

    drawFieldStructure();

  }
}


/* =========================================================
   DIAGONAL
========================================================= */

function drawDiagonalStructure() {

  const angle =
    random(
      -0.65,
      0.65
    );

  push();

  rotate(angle);

  const bands =
    floor(
      random(
        2,
        4
      )
    );

  for (
    let b = 0;
    b < bands;
    b++
  ) {

    const offset =
      map(
        b,
        0,
        bands - 1,
        -width * 0.32,
        width * 0.32
      );

    drawRibbon(
      offset,
      b
    );
  }

  pop();
}


/* =========================================================
   RIBBON
========================================================= */

function drawRibbon(
  offset,
  index
) {

  const thickness =
    random(
      width * 0.035,
      width * 0.09
    );

  const segments =
    16;

  beginShape();

  for (
    let i = 0;
    i <= segments;
    i++
  ) {

    const x =
      map(
        i,
        0,
        segments,
        -width * 0.8,
        width * 0.8
      );

    const wave =
      sin(
        i * 0.5 +
        index
      ) *
      width *
      0.035;

    const n =
      noise(
        i * 0.3,
        index,
        seed * 0.000001
      );

    const y =
      offset +
      wave +
      map(
        n,
        0,
        1,
        -width * 0.025,
        width * 0.025
      );

    vertex(
      x,
      y
    );
  }

  for (
    let i = segments;
    i >= 0;
    i--
  ) {

    const x =
      map(
        i,
        0,
        segments,
        -width * 0.8,
        width * 0.8
      );

    const wave =
      sin(
        i * 0.5 +
        index
      ) *
      width *
      0.035;

    const n =
      noise(
        i * 0.3,
        index + 10,
        seed * 0.000001
      );

    const y =
      offset +
      wave +
      thickness +
      map(
        n,
        0,
        1,
        -width * 0.025,
        width * 0.025
      );

    vertex(
      x,
      y
    );
  }

  endShape(
    CLOSE
  );
}


/* =========================================================
   FLOW
========================================================= */

function drawFlowStructure() {

  const lines =
    floor(
      random(
        4,
        8
      )
    );

  noFill();

  for (
    let i = 0;
    i < lines;
    i++
  ) {

    const y =
      map(
        i,
        0,
        lines - 1,
        -height * 0.42,
        height * 0.42
      );

    beginShape();

    for (
      let x = -width * 0.6;
      x <= width * 0.6;
      x += width * 0.025
    ) {

      const wave =
        sin(
          x * 0.012 +
          i * 0.8
        ) *
        width *
        0.04;

      const n =
        noise(
          x * 0.004,
          i * 0.2,
          seed * 0.000001
        );

      vertex(
        x,
        y +
        wave +
        map(
          n,
          0,
          1,
          -20,
          20
        )
      );
    }

    endShape();
  }
}


/* =========================================================
   SPLIT
========================================================= */

function drawSplitStructure() {

  const angle =
    random(
      -0.5,
      0.5
    );

  push();

  rotate(angle);

  strokeWeight(
    width * 0.008
  );

  line(
    0,
    -height * 0.7,
    0,
    height * 0.7
  );

  const sideCount =
    floor(
      random(
        3,
        6
      )
    );

  for (
    let side = -1;
    side <= 1;
    side += 2
  ) {

    for (
      let i = 0;
      i < sideCount;
      i++
    ) {

      const y =
        map(
          i,
          0,
          sideCount - 1,
          -height * 0.38,
          height * 0.38
        );

      drawGeometricArc(
        side * width * 0.18,
        y,
        width * random(0.12, 0.26),
        side
      );
    }
  }

  pop();
}


/* =========================================================
   ORBITAL
========================================================= */

function drawOrbitalStructure() {

  const cx =
    random(
      -width * 0.15,
      width * 0.15
    );

  const cy =
    random(
      -height * 0.15,
      height * 0.15
    );

  const rings =
    floor(
      random(
        3,
        6
      )
    );

  for (
    let i = 0;
    i < rings;
    i++
  ) {

    const radius =
      width *
      (0.12 + i * 0.075);

    drawDistortedRing(
      cx,
      cy,
      radius,
      i
    );
  }
}


/* =========================================================
   FIELD STRUCTURE
========================================================= */

function drawFieldStructure() {

  const count =
    floor(
      random(
        5,
        9
      )
    );

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const x =
      random(
        -width * 0.45,
        width * 0.45
      );

    const y =
      random(
        -height * 0.45,
        height * 0.45
      );

    const size =
      random(
        width * 0.12,
        width * 0.28
      );

    drawGeometricCluster(
      x,
      y,
      size,
      i
    );
  }
}


/* =========================================================
   DISTORTED RING
========================================================= */

function drawDistortedRing(
  cx,
  cy,
  radius,
  index
) {

  push();

  translate(
    cx,
    cy
  );

  rotate(
    random(
      TWO_PI
    )
  );

  beginShape();

  const points =
    dna.symmetry * 3;

  for (
    let i = 0;
    i <= points;
    i++
  ) {

    const angle =
      TWO_PI *
      i /
      points;

    const n =
      noise(
        cos(angle) * 0.8,
        sin(angle) * 0.8,
        index
      );

    const r =
      radius *
      (
        0.82 +
        n * 0.28
      );

    vertex(
      cos(angle) * r,
      sin(angle) * r
    );
  }

  endShape();

  pop();
}


/* =========================================================
   GEOMETRIC ARC
========================================================= */

function drawGeometricArc(
  x,
  y,
  size,
  direction
) {

  push();

  translate(
    x,
    y
  );

  rotate(
    direction *
    random(
      0.3,
      1.2
    )
  );

  noFill();

  beginShape();

  const points = 10;

  for (
    let i = 0;
    i <= points;
    i++
  ) {

    const t =
      i /
      points;

    const angle =
      PI +
      t *
      PI;

    const r =
      size *
      (
        0.8 +
        sin(t * PI) *
        0.2
      );

    vertex(
      cos(angle) * r,
      sin(angle) * r
    );
  }

  endShape();

  pop();
}


/* =========================================================
   GEOMETRIC CLUSTER
========================================================= */

function drawGeometricCluster(
  x,
  y,
  size,
  index
) {

  push();

  translate(
    x,
    y
  );

  rotate(
    random(
      TWO_PI
    )
  );

  const layers =
    floor(
      random(
        2,
        5
      )
    );

  for (
    let i = 0;
    i < layers;
    i++
  ) {

    const s =
      size *
      (1 - i * 0.18);

    drawPolygon(
      s,
      dna.symmetry,
      i
    );
  }

  pop();
}


/* =========================================================
   POLYGON
========================================================= */

function drawPolygon(
  size,
  points,
  layer
) {

  const colorIndex =
    1 +
    (
      layer %
      (palette.colors.length - 1)
    );

  stroke(
    palette.colors[
      colorIndex
    ]
  );

  strokeWeight(
    max(
      0.8,
      width * 0.0025
    )
  );

  noFill();

  beginShape();

  for (
    let i = 0;
    i < points;
    i++
  ) {

    const angle =
      TWO_PI *
      i /
      points;

    const distortion =
      noise(
        i * 0.3,
        layer,
        seed * 0.000001
      );

    const radius =
      size *
      (
        0.78 +
        distortion *
        dna.distortion
      );

    vertex(
      cos(angle) * radius,
      sin(angle) * radius
    );
  }

  endShape(
    CLOSE
  );
}


/* =========================================================
   MEDIUM GEOMETRY
========================================================= */

function drawMediumGeometry() {

  randomSeed(
    seed + 3000
  );

  const amount =
    floor(
      random(
        12,
        24
      )
    );

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    /*
      Some areas deliberately stay empty.
    */

    if (
      random() >
      dna.density
    ) {
      continue;
    }

    const x =
      random(
        -width * 0.48,
        width * 0.48
      );

    const y =
      random(
        -height * 0.48,
        height * 0.48
      );

    const size =
      random(
        width * 0.025,
        width * 0.11
      );

    push();

    translate(
      x,
      y
    );

    rotate(
      random(
        TWO_PI
      )
    );

    const type =
      floor(
        random(
          0,
          5
        )
      );

    if (
      type === 0
    ) {

      drawDiamond(
        size
      );

    } else if (
      type === 1
    ) {

      drawStar(
        size
      );

    } else if (
      type === 2
    ) {

      drawCross(
        size
      );

    } else if (
      type === 3
    ) {

      drawWeave(
        size
      );

    } else {

      drawBrokenPolygon(
        size
      );
    }

    pop();
  }
}


/* =========================================================
   DIAMOND
========================================================= */

function drawDiamond(
  size
) {

  strokeWeight(
    width * 0.002
  );

  noFill();

  beginShape();

  vertex(
    0,
    -size
  );

  vertex(
    size,
    0
  );

  vertex(
    0,
    size
  );

  vertex(
    -size,
    0
  );

  endShape(
    CLOSE
  );

  if (
    random() <
    0.5
  ) {

    square(
      -size * 0.35,
      -size * 0.35,
      size * 0.7
    );
  }
}


/* =========================================================
   STAR
========================================================= */

function drawStar(
  size
) {

  const points =
    dna.symmetry;

  noFill();

  beginShape();

  for (
    let i = 0;
    i < points * 2;
    i++
  ) {

    const angle =
      TWO_PI *
      i /
      (points * 2);

    const radius =
      i % 2 === 0
        ? size
        : size * 0.38;

    vertex(
      cos(angle) * radius,
      sin(angle) * radius
    );
  }

  endShape(
    CLOSE
  );
}


/* =========================================================
   CROSS
========================================================= */

function drawCross(
  size
) {

  strokeWeight(
    width * 0.002
  );

  line(
    -size,
    -size,
    size,
    size
  );

  line(
    size,
    -size,
    -size,
    size
  );

  circle(
    0,
    0,
    size * 0.45
  );
}


/* =========================================================
   WEAVE
========================================================= */

function drawWeave(
  size
) {

  strokeWeight(
    width * 0.0015
  );

  const count = 5;

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const offset =
      map(
        i,
        0,
        count - 1,
        -size,
        size
      );

    line(
      -size,
      offset,
      size,
      offset
    );

    line(
      offset,
      -size,
      offset,
      size
    );
  }
}


/* =========================================================
   BROKEN POLYGON
========================================================= */

function drawBrokenPolygon(
  size
) {

  const points =
    random([
      5,
      6,
      7,
      8
    ]);

  noFill();

  beginShape();

  for (
    let i = 0;
    i < points;
    i++
  ) {

    const angle =
      TWO_PI *
      i /
      points;

    const radius =
      size *
      random(
        0.65,
        1.05
      );

    vertex(
      cos(angle) * radius,
      sin(angle) * radius
    );
  }

  endShape();
}


/* =========================================================
   MICRO DETAILS
========================================================= */

function drawMicroDetails() {

  randomSeed(
    seed + 4000
  );

  /*
    Much fewer details than before.
    This is important.

    We don't want visual noise.
  */

  const amount =
    floor(
      random(
        30,
        65
      )
    );

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    if (
      random() >
      dna.density * 0.55
    ) {
      continue;
    }

    const x =
      random(
        -width * 0.5,
        width * 0.5
      );

    const y =
      random(
        -height * 0.5,
        height * 0.5
      );

    const size =
      random(
        width * 0.006,
        width * 0.025
      );

    drawMicroMark(
      x,
      y,
      size
    );
  }
}


/* =========================================================
   MICRO MARK
========================================================= */

function drawMicroMark(
  x,
  y,
  size
) {

  push();

  translate(
    x,
    y
  );

  rotate(
    random(
      TWO_PI
    )
  );

  const c =
    random(
      palette.colors.slice(
        1
      )
    );

  stroke(c);

  strokeWeight(
    max(
      0.5,
      width * 0.001
    )
  );

  noFill();

  const type =
    floor(
      random(
        0,
        3
      )
    );

  if (
    type === 0
  ) {

    line(
      -size,
      0,
      size,
      0
    );

  } else if (
    type === 1
  ) {

    line(
      0,
      -size,
      0,
      size
    );

  } else {

    beginShape();

    vertex(
      0,
      -size
    );

    vertex(
      size,
      0
    );

    vertex(
      0,
      size
    );

    endShape();
  }

  pop();
}


/* =========================================================
   ACCENTS
========================================================= */

function drawAccents() {

  randomSeed(
    seed + 5000
  );

  const amount =
    floor(
      random(
        3,
        8
      )
    );

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const x =
      random(
        -width * 0.4,
        width * 0.4
      );

    const y =
      random(
        -height * 0.4,
        height * 0.4
      );

    const size =
      random(
        width * 0.015,
        width * 0.045
      );

    const c =
      color(
        palette.colors[
          palette.colors.length - 1
        ]
      );

    c.setAlpha(
      random(
        120,
        220
      )
    );

    stroke(c);

    strokeWeight(
      width * 0.003
    );

    noFill();

    push();

    translate(
      x,
      y
    );

    rotate(
      random(
        TWO_PI
      )
    );

    /*
      Accent geometry
    */

    beginShape();

    for (
      let j = 0;
      j < 6;
      j++
    ) {

      const angle =
        TWO_PI *
        j /
        6;

      const r =
        j % 2 === 0
          ? size
          : size * 0.4;

      vertex(
        cos(angle) * r,
        sin(angle) * r
      );
    }

    endShape(
      CLOSE
    );

    pop();
  }
}


/* =========================================================
   RESIZE
========================================================= */

function windowResized() {

  const size =
    min(
      windowWidth,
      windowHeight
    );

  resizeCanvas(
    size,
    size
  );

  redraw();
}