declare module "leaflet" {
  namespace Icon {
    class Default {
      // eslint-disable-next-line unused-imports/no-unused-vars
      static mergeOptions(arg0: {
        iconRetinaUrl: string;
        iconUrl: string;
        shadowUrl: string;
      }) {
        throw new Error("Method not implemented.");
      }
      _getIconUrl(name: string): string;
    }
  }
}
