import * as THREE from "three"
class _ThreeToCesium {
  #options
  #isDestroy
  constructor(cesiumViewer,options={}) {
    this.cesiumViewer = cesiumViewer;
    this.#options = {
      cameraNear:options.cameraNear ?? 0.1,
      cameraFar:options.cameraFar ?? 10000,
    };
    this.#attachRendererDomToCesium();
  }
  #attachRendererDomToCesium() {
    let cesiumContainer = this.cesiumViewer.container;
    let width = cesiumContainer.offsetWidth;
    let height = cesiumContainer.offsetHeight;
    this.threeScene = new THREE.Scene();
    this.threeCamera = new THREE.PerspectiveCamera(undefined, width/height, this.#options.cameraNear, this.#options.cameraFar);
    this.threeRenderer = new THREE.WebGLRenderer({ alpha: true });
    this.threeRenderer.setClearColor(0x000000, 0);
    this.threeRenderer.domElement.style.position = "absolute";
    this.threeRenderer.domElement.style.top = "0";
    this.threeRenderer.domElement.style.width = "100%";
    this.threeRenderer.domElement.style.height = "100%";
    this.threeRenderer.domElement.style.pointerEvents = "none";
    cesiumContainer.appendChild(this.threeRenderer.domElement);
  }
  #syncCamera() {
    this.threeCamera.matrixAutoUpdate = false;
    this.threeCamera.fov = Cesium.Math.toDegrees(this.cesiumViewer.camera.frustum.fovy)
    let cvm = this.cesiumViewer.camera.viewMatrix;
    let civm = this.cesiumViewer.camera.inverseViewMatrix;
    this.threeCamera.matrixWorld.set(
      civm[0], civm[4], civm[8], civm[12],
      civm[1], civm[5], civm[9], civm[13],
      civm[2], civm[6], civm[10], civm[14],
      civm[3], civm[7], civm[11], civm[15]
    );

    this.threeCamera.matrixWorldInverse.set(
      cvm[0], cvm[4], cvm[8], cvm[12],
      cvm[1], cvm[5], cvm[9], cvm[13],
      cvm[2], cvm[6], cvm[10], cvm[14],
      cvm[3], cvm[7], cvm[11], cvm[15]
    );

    let cesiumContainer = this.cesiumViewer.container;
    let width = cesiumContainer.offsetWidth;
    let height = cesiumContainer.offsetHeight;
    let aspect = width / height;
    this.threeCamera.aspect = aspect;
    this.threeCamera.updateProjectionMatrix();
    this.threeRenderer.setSize(width, height);

  }
  add(object,cartesian3) {
    let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian3);
    let rotationMatrix = new THREE.Matrix4();
    rotationMatrix.set(
      modelMatrix[0], modelMatrix[4], modelMatrix[8], modelMatrix[12],
      modelMatrix[1], modelMatrix[5], modelMatrix[9], modelMatrix[13],
      modelMatrix[2], modelMatrix[6], modelMatrix[10], modelMatrix[14],
      0, 0, 0, 1
    );
    rotationMatrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    let group = new THREE.Group();
    this.threeScene.add(group);
    group.add(object);
    group.applyMatrix4(rotationMatrix);
    return group;
  }
  remove(object){
    this.threeScene.remove(object.parent);
    this.threeScene.remove(object);
  }
  update(){
    if(this.#isDestroy) return;
    this.#syncCamera();
    this.threeRenderer.render(this.threeScene, this.threeCamera);
  }
  destroy(){
    this.#isDestroy = true;
    this.threeRenderer.dispose();
    this.cesiumViewer.container.removeChild(this.threeRenderer.domElement); 
  }
}
function ThreeToCesium(...params){
  return  new _ThreeToCesium(...params);
}
export default ThreeToCesium