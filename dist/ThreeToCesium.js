var u = (i) => {
  throw TypeError(i);
};
var o = (i, e, t) => e.has(i) || u("Cannot " + t);
var d = (i, e, t) => (o(i, e, "read from private field"), t ? t.call(i) : e.get(i)), l = (i, e, t) => e.has(i) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), p = (i, e, t, r) => (o(i, e, "write to private field"), r ? r.call(i, t) : e.set(i, t), t), c = (i, e, t) => (o(i, e, "access private method"), t);
import * as a from "three";
var n, m, f, C;
class R {
  constructor(e, t = {}) {
    l(this, m);
    l(this, n);
    var r, s;
    this.cesiumViewer = e, p(this, n, {
      near: (r = t.near) != null ? r : 0.1,
      far: (s = t.far) != null ? s : 1e4
    }), c(this, m, f).call(this);
  }
  add(e, t) {
    let r = Cesium.Transforms.eastNorthUpToFixedFrame(t), s = new a.Matrix4();
    s.set(
      r[0],
      r[4],
      r[8],
      r[12],
      r[1],
      r[5],
      r[9],
      r[13],
      r[2],
      r[6],
      r[10],
      r[14],
      0,
      0,
      0,
      1
    ), s.multiply(new a.Matrix4().makeRotationX(Math.PI / 2));
    let h = new a.Group();
    return this.threeScene.add(h), h.add(e), h.applyMatrix4(s), h;
  }
  remove(e) {
    this.threeScene.remove(e.parent), this.threeScene.remove(e);
  }
  update() {
    this._isDestory || (c(this, m, C).call(this), this.threeRenderer.render(this.threeScene, this.threeCamera));
  }
  destory() {
    this._isDestory = !0, this.threeRenderer.dispose(), this.cesiumViewer.container.removeChild(this.threeRenderer.domElement);
  }
}
n = new WeakMap(), m = new WeakSet(), f = function() {
  let e = this.cesiumViewer.container, t = e.offsetWidth, r = e.offsetHeight;
  this.threeScene = new a.Scene(), this.threeCamera = new a.PerspectiveCamera(void 0, t / r, d(this, n).near, d(this, n).far), this.threeRenderer = new a.WebGLRenderer({ alpha: !0 }), this.threeRenderer.setClearColor(0, 0), this.threeRenderer.domElement.style.position = "absolute", this.threeRenderer.domElement.style.top = "0", this.threeRenderer.domElement.style.width = "100%", this.threeRenderer.domElement.style.height = "100%", this.threeRenderer.domElement.style.pointerEvents = "none", e.appendChild(this.threeRenderer.domElement);
}, C = function() {
  this.threeCamera.matrixAutoUpdate = !1, this.threeCamera.fov = Cesium.Math.toDegrees(this.cesiumViewer.camera.frustum.fovy);
  let e = this.cesiumViewer.camera.viewMatrix, t = this.cesiumViewer.camera.inverseViewMatrix;
  this.threeCamera.matrixWorld.set(
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
  ), this.threeCamera.matrixWorldInverse.set(
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
  );
  let r = this.cesiumViewer.container, s = r.offsetWidth, h = r.offsetHeight, w = s / h;
  this.threeCamera.aspect = w, this.threeCamera.updateProjectionMatrix(), this.threeRenderer.setSize(s, h);
};
function v(...i) {
  return new R(...i);
}
export {
  v as default
};
