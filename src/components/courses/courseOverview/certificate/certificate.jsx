// import React, { useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';

const CertificateCourse = React.memo(({ course }) => {
  return (
    <div>
      <h3 className="title">Recursos adicionales</h3>
      {
        course && course.recursos && (
          <div>
            <h3 className="title">Certificado</h3>
            <Image
              src={course.url}
              alt={course.description}
              layout="responsive"
              objectFit="cover"
              width={720}
              height={480}
            />
          </div>
        )
      }
    </div>
  );
});

export default CertificateCourse;
