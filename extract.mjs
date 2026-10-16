// extract-breasts.mjs
// Run with: npm i @gltf-transform/core @gltf-transform/functions
//           node extract-breasts.mjs
import { NodeIO } from '@gltf-transform/core';
import { prune } from '@gltf-transform/functions';

const KEEP = /^VH_F_(mammary_gland_[LR]|fat_[LR]|areolar_tubercles_[LR]|mammary_lobes_[LR]|main_lactiferous_(ducts|sinuses)_[LR]|suspensory_ligaments_[LR])$/;

const io = new NodeIO();
const doc = await io.read('3d-vh-f-united.glb');

for (const node of doc.getRoot().listNodes()) {
    if (node.getMesh() && !KEEP.test(node.getName())) node.setMesh(null);
}
await doc.transform(prune());
await io.write('breasts.glb', doc);
console.log('wrote breasts.glb');