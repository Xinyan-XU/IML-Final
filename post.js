import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
//optional
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass'
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js'
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';

export function post(scene, camera, renderer) {
    const composer = new EffectComposer(renderer)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.setSize(window.innerWidth, window.innerHeight)

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // const pixelPass = new RenderPixelatedPass(12, scene, camera)
    // pixelPass.pixelSize = 3
    // pixelPass.normalEdgeStrength = 2
    // composer.addPass(pixelPass)

    // const afterimagePass = new AfterimagePass()
    // afterimagePass.uniforms.damp.value = 0.96
    // composer.addPass(afterimagePass)

    // const bloomPass = new UnrealBloomPass()
    // bloomPass.strength = 0.6
    // // bloomPass.radius = 3
    // // bloomPass.threshold = 0.3
    // composer.addPass(bloomPass)

    const gtaoPass = new GTAOPass(scene, camera)
    gtaoPass.enabled = true
    gtaoPass.output = GTAOPass.OUTPUT.Depth
    gtaoPass.scale = 2
    gtaoPass.thickness = 1
    composer.addPass(gtaoPass)

    // color to grayscale conversion
    const effectGrayScale = new ShaderPass(LuminosityShader)
    effectGrayScale.enabled = false
    composer.addPass(effectGrayScale)

    // Sobel operator
    const effectSobel = new ShaderPass(SobelOperatorShader)
    effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio
    effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio
    effectSobel.enabled = false
    composer.addPass(effectSobel)

    // const glitchPass = new GlitchPass()
    // glitchPass.enabled = false
    // composer.addPass(glitchPass)

    const outputPass = new OutputPass()
    composer.addPass(outputPass)

    // return { composer: composer, gtao: gtaoPass }

    return { composer: composer, gtao: gtaoPass, grayscale: effectGrayScale, sobel: effectSobel }
}