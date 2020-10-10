import MC from "@kissmybutton/motorcortex";

export default class ZoomTo extends MC.API.MonoIncident {
  onProgress(progress /*, millisecond*/) {
  const moscow = ([37.6178, 55.7517]);
    if (this.element.entity.map.getZoom() !== parseInt(11 + progress * 20)) {
          this.element.entity.map.setZoom(parseInt(11 + progress * 20))
    }
  }
}
