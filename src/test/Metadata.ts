/* eslint-disable */
import axios from 'axios'
import { IMetadataSectionSerializer } from '../interfaces/IMetadataSectionSerializer'
import ResourceLocation from '../resources/ResourceLocation'
import SimpleResource from '../resources/SimpleResource';

(async () => {
  const blob = await (await axios.get('assets/objects/bd/bdf48ef6b5d0d23bbb02e17d04865216179f510a', { responseType: 'blob' })).data
  const blob1 = await (await axios.get('assets/indexes/1.16.json', { responseType: 'blob' })).data

  const a = new SimpleResource('s', new ResourceLocation('s'), new File([blob], '', { type: 'image/png' }), blob1)

  const img = new Image()
  img.src = URL.createObjectURL(a.getBlob())
  img.onload = () => {
    document.body.appendChild(img)
  }

  class aa implements IMetadataSectionSerializer<any> {
    getMetadataSectionName (): string {
      return 'objects'
    }

    fromJson (obj: Object) {
      return obj
    }
  }

  console.log(await a.getMetadata(new aa()))
})().catch(e => console.log(e))