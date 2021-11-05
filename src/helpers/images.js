import Resizer from 'react-image-file-resizer';

const getSize = (size) => {
  switch (size) {
    case 'profile': {
      return { w: 250, h: 250 };
    }
    case 'medium': {
      return { w: 720, h: 480 };
    }
    case 'large': {
      return { w: 1024, h: 768 };
    }
    default: {
      return { w: 1024, h: 768 };
    }
  }
};

export const reduceImageSize = (file, size) => {
  const dimensions = getSize(size);
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      dimensions.w,
      dimensions.h,
      file.type.split('/')[1],
      100,
      0,
      async (newFile) => {
        resolve(newFile);
      },
      'file',
    );
  });
};
