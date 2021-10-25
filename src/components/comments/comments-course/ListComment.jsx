import { useSession } from 'next-auth/client';
import { AddComment } from '../AddComment';
import { useForm } from '../hooks/useForm';
import styles from '../comments.module.css';
import { ListItem } from './ListItem';

export const ListComment = () => {
  const [session] = useSession();

  const { values, handleInputChange } = useForm({
    comentario: '',
  });

  const handleSubmitComment = () => { };

  const page = [
    {
      _id: '615da8fe7903816a9f80d2cd',
      likes: 0,
      articulo_id: '6137b5ca47b5533b4d2b6d8b',
      usuario_id: {
        _id: '60ef2ef76439d86cf5a29983',
        name: 'christian',
        picture: 'https://ilovet-app.s3.us-east-2.amazonaws.com/60ef2ef76439d86cf5a29983/resources/512.png',
      },
      comentario: 'esta es una prueba de maquetación',
      respuesta: 2,
      createdAt: '2021-10-06T13:47:42.229Z',
      updatedAt: '2021-10-11T14:35:13.687Z',
    },
    {
      _id: '61644b36fec85a37ceb2455c',
      likes: 0,
      articulo_id: '6137b5ca47b5533b4d2b6d8b',
      usuario_id: {
        _id: '6115a16bddf0787fea132bc2',
        name: 'Leonardo',
        apellidos: 'Rodríguez',
        picture: 'https://ilovet-app.s3.us-east-2.amazonaws.com/6115a16bddf0787fea132bc2/resources/auryn.png',
      },
      comentario: 'Solo es maquetación',
      respuesta: 1,
      createdAt: '2021-10-11T14:33:26.220Z',
      updatedAt: '2021-10-11T14:33:36.143Z',
    },
  ];

  return (
    <div className="content-n-p content-blog-autor">
      <ul>

        {
          session?.user && (
            <AddComment
              values={values}
              handleInputChange={handleInputChange}
              fieldName="comentario"
              handleSubmit={handleSubmitComment}
            />
          )
        }
      </ul>

      <ul className={`${styles.commentList}`}>
        {
          page.map((comment) => (
            <li key={comment._id}>
              <ListItem comment={comment} type="comment" />
            </li>
          ))
        }
      </ul>
    </div>
  );
};
