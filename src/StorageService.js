const StorageService = (() => {
  return {
    initColors: (colors) => {
      window.localStorage.clear();
      colors.forEach((color) => {
        const { date, ...metadata } = color;
        console.log(metadata);
        window.localStorage.setItem(date, JSON.stringify(metadata));
      });
    },
    getColor: (date) => {
      console.log(window.localStorage.getItem(date));
      return "";
    },
  };
})();

export default StorageService;
