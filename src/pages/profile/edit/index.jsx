import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSession } from 'next-auth/client';
import { fetch as fetchProfile } from '@/reducers/profile';
import { Footer, Layout, ProfileSettingsComponent } from '@/components';
import { updateUserData, uploadImgProfile } from '@/services/profile';

const EditProfile = () => {
  // const [session] = useSession();
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  const updateDataUser = async (userData, userImg) => {
    const path = `${data._id}/resources`;

    updateUserData(data._id, userData);

    const res = await uploadImgProfile(path, userImg.fileU, userImg.fileU.name);
    if (res.ok) {
      document.getElementById('mensaje-final').style.display = 'block';
    }
  };

  return (
    <Layout>
      {
        data.name !== undefined ? (
          <ProfileSettingsComponent
            id={data._id}
            nameU={data.name}
            lastName={data.apellidos}
            userBio={data.biography}
            pictureU={data.picture}
            updateDU={updateDataUser}
          />
        ) : (
          <div />
        )
      }
      <Footer />
    </Layout>
  );
};

export default EditProfile;
