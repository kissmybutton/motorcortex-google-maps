import MC from "@kissmybutton/motorcortex";
import { Loader, LoaderOptions } from "google-maps";

export default class olMap extends MC.API.DOMClip {
  onAfterRender() {
    const loader = new Loader("AIzaSyA_hEYSWVXFGVfesIRwE6BmQeQzktlKXso", {});

    this.context.loading = true;
    this.contextLoading();
    const gMap = { map: {}, google: {}, elem: this.context.rootElement };
    this.context.rootElement.style.transformOrigin = `center`;
    loader.load().then(google => {
      gMap.google = google;
      gMap.map = new google.maps.Map(this.context.rootElement, {
        center: {
          lat: this.attrs.view.center[1],
          lng: this.attrs.view.center[0]
        },
        zoom: 20
      });
      this.context.loading = false;
      this.contextLoaded();
      this.setCustomEntity("gmap", gMap, ["maps"]);
    });

    this.setCustomEntity("gmap", gMap, ["maps"]);
  }
}
