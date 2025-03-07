import * as o from "three";
class c {
  constructor(i) {
    this.cesiumViewer = i;
  }
  attachRendererDomToCesium(i) {
    let t = this.cesiumViewer.container;
    i.setSize(t.offsetWidth, t.offsetHeight), i.domElement.style.position = "absolute", i.domElement.style.top = "0", i.domElement.style.width = "100%", i.domElement.style.height = "100%", i.domElement.style.pointerEvents = "none", t.appendChild(i.domElement);
  }
  syncCamera(i) {
    i.matrixAutoUpdate = !1, i.fov = Cesium.Math.toDegrees(this.cesiumViewer.camera.frustum.fovy);
    let t = this.cesiumViewer.camera.viewMatrix, e = this.cesiumViewer.camera.inverseViewMatrix;
    i.matrixWorld.set(
      e[0],
      e[4],
      e[8],
      e[12],
      e[1],
      e[5],
      e[9],
      e[13],
      e[2],
      e[6],
      e[10],
      e[14],
      e[3],
      e[7],
      e[11],
      e[15]
    ), i.matrixWorldInverse.set(
      t[0],
      t[4],
      t[8],
      t[12],
      t[1],
      t[5],
      t[9],
      t[13],
      t[2],
      t[6],
      t[10],
      t[14],
      t[3],
      t[7],
      t[11],
      t[15]
    );
    let s = this.cesiumViewer.container, a = s.offsetWidth, m = s.offsetHeight, l = a / m;
    i.aspect = l, i.updateProjectionMatrix();
  }
  createBridgeContainer(i) {
    let t = Cesium.Transforms.eastNorthUpToFixedFrame(i), e = new o.Matrix4();
    e.set(
      t[0],
      t[4],
      t[8],
      t[12],
      t[1],
      t[5],
      t[9],
      t[13],
      t[2],
      t[6],
      t[10],
      t[14],
      0,
      0,
      0,
      1
    ), e.multiply(new o.Matrix4().makeRotationX(Math.PI / 2));
    let s = new o.Group();
    return s.applyMatrix4(e), s;
  }
}
export {
  c as default
};
