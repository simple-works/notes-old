//==============================================================================
// ■ Assets (assets.js)
//------------------------------------------------------------------------------
//     Local assets render with error-handling utility functions.
//==============================================================================
// export default {
//   image(name, defName, dirName) {
//     const baseDirName = "assets/images";
//     const emptyName = "empty.png";
//     const errorName = "error.png";
//     let path = baseDirName;
//     path += dirName ? `/${dirName}` : "";
//     path += name ? `/${name}` : defName ? `/${defName}` : `/${emptyName}`;
//     let file = "";
//     try {
//       file = require(`@/${path}`);
//     } catch (e) {
//       file = require(`@/${baseDirName}/${errorName}`);
//     }
//     return file;
//   },
//   video(name, defName, dirName) {
//     const baseDirName = "assets/videos";
//     const emptyName = "empty.mp4";
//     const errorName = "error.mp4";
//     let path = baseDirName;
//     path += dirName ? `/${dirName}` : "";
//     path += name ? `/${name}` : defName ? `/${defName}` : `/${emptyName}`;
//     let file = "";
//     try {
//       file = require(`@/${path}`);
//     } catch (e) {
//       file = require(`@/${baseDirName}/${errorName}`);
//     }
//     return file;
//   }
// };
