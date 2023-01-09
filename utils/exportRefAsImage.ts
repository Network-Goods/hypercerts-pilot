import html2canvas from "html2canvas";
const exportAsImage = async (el: HTMLElement) => {
  const canvas = await html2canvas(el, {
    // options
    backgroundColor: null,
    onclone: (el) => {
      const shiftElements = (selector: string, shiftPercentage: number) => {
        const elements = el.querySelectorAll<HTMLDivElement>(selector);
        elements.forEach((element) => {
          // adjust styles or do whatever you want here
          element.style.transform = `translateY(-${shiftPercentage}%)`;
        });
      };
      shiftElements(".title", 35);
      shiftElements(".work-scope-label", 35);
      shiftElements(".impact-scope-label", 25);
      shiftElements(".work-time", 35);
    },
  });
  const image = canvas.toDataURL("image/png", 1.0);
  console.log(image);
  return image;
  // downloadImage(image, imageFileName);
};

export default exportAsImage;
