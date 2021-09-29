import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { AccordionComponent } from '@/components';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';

const ProfileTools = () => {
  const router = useRouter();
  const { data: categories } = useSWR(ApiRoutes.ToolsCategories, fetchData);
  const { data: tools } = useSWR(ApiRoutes.Tools, fetchData);
  const [loading, setLoading] = useState(true);
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    if (categories && tools) {
      const newArray = categories.data.map((cat) => {
        const categoryTools = tools.data.filter((item) => item.categoria_id === cat._id);
        return {
          ...cat,
          herramientasCategoria: categoryTools,
        };
      });
      setAccordionData(newArray);
      setLoading(false);
    }
  }, [categories, tools]);
  return (
    <div className="container">
      <div className="d-flex justify-content-center justify-content-lg-end mb-4">
        <button
          onClick={() => router.push('/editor/tool')}
          className="button button--theme-primary"
        >
          Nueva herramienta
        </button>
      </div>
      <div className="row justify-content-center">
        {loading ? <LoadingIndicator /> : (
          <div className="col-12 col-lg-7">
            <AccordionComponent
              accordionData={accordionData}
              isEditable
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTools;
