import ReactPixel from 'react-facebook-pixel';

const pixelId = '1191680965477339';
const options = { autoConfig: true, debug: false };

ReactPixel.init(pixelId, null, options);
ReactPixel.pageView();

export default ReactPixel;
