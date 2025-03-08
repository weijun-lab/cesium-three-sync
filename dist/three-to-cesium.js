var C = (i) => {
  throw TypeError(i);
};
var c = (i, e, t) => e.has(i) || C("Cannot " + t);
var d = (i, e, t) => (c(i, e, "read from private field"), t ? t.call(i) : e.get(i)), l = (i, e, t) => e.has(i) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), u = (i, e, t, r) => (c(i, e, "write to private field"), r ? r.call(i, t) : e.set(i, t), t), p = (i, e, t) => (c(i, e, "access private method"), t);
import * as h from "three";
import * as f from "cesium";
var n, o, m, w, R;
class v {
  constructor(e, t = {}) {
    l(this, m);
    l(this, n);
    l(this, o);
    var r, s;
    this.cesiumViewer = e, u(this, n, {
      cameraNear: (r = t.cameraNear) != null ? r : 0.1,
      cameraFar: (s = t.cameraFar) != null ? s : 1e4
    }), p(this, m, w).call(this);
  }
  add(e, t) {
    let r = f.Transforms.eastNorthUpToFixedFrame(t), s = new h.Matrix4();
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
    ), s.multiply(new h.Matrix4().makeRotationX(Math.PI / 2));
    let a = new h.Group();
    return this.threeScene.add(a), a.add(e), a.applyMatrix4(s), a;
  }
  remove(e) {
    this.threeScene.remove(e.parent), this.threeScene.remove(e);
  }
  update() {
    d(this, o) || (p(this, m, R).call(this), this.threeRenderer.render(this.threeScene, this.threeCamera));
  }
  destroy() {
    u(this, o, !0), this.threeRenderer.dispose(), this.cesiumViewer.container.removeChild(this.threeRenderer.domElement);
  }
}
n = new WeakMap(), o = new WeakMap(), m = new WeakSet(), w = function() {
  let e = this.cesiumViewer.container, t = e.offsetWidth, r = e.offsetHeight;
  this.threeScene = new h.Scene(), this.threeCamera = new h.PerspectiveCamera(void 0, t / r, d(this, n).cameraNear, d(this, n).cameraFar), this.threeRenderer = new h.WebGLRenderer({ alpha: !0 }), this.threeRenderer.setClearColor(0, 0), this.threeRenderer.domElement.style.position = "absolute", this.threeRenderer.domElement.style.top = "0", this.threeRenderer.domElement.style.width = "100%", this.threeRenderer.domElement.style.height = "100%", this.threeRenderer.domElement.style.pointerEvents = "none", e.appendChild(this.threeRenderer.domElement);
}, R = function() {
  this.threeCamera.matrixAutoUpdate = !1, this.threeCamera.fov = f.Math.toDegrees(this.cesiumViewer.camera.frustum.fovy);
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
  let r = this.cesiumViewer.container, s = r.offsetWidth, a = r.offsetHeight, x = s / a;
  this.threeCamera.aspect = x, this.threeCamera.updateProjectionMatrix(), this.threeRenderer.setSize(s, a);
};
function E(...i) {
  return new v(...i);
}
export {
  E as default
};
