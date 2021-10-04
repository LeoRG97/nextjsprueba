/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import BootstrapTable from 'react-bootstrap-table-next';
import styles from './profileMembersAndInvitations.module.css';
import TooltipsMembers from './TooltipMembers';
import { DeleteModal, UpdateRolUserModal } from '@/components';
import { Roles } from '@/global/constants';

const TableMember = ({ data, deleteMember, mutate }) => {
  const router = useRouter();
  useEffect(() => {

  }, [router]);

  const [modalDeleteH, setModalDelete] = useState(false);
  const [optionsModal, setOptionsModal] = useState({});

  const deleteMemberFunc = (id) => {
    setOptionsModal({
      fncConfirm: id,
      cancel: 'Cancelar',
      confirm: 'Eliminar miembro',
      textHeader: 'Alerta',
      textBody: 'Estás apunto de eliminar la cuenta de este miembro ¿Seguro que deseas continuar?',
    });
    setModalDelete(true);
  };

  const onDelete = () => {
    setModalDelete(false);
    deleteMember(optionsModal.fncConfirm);
  };

  const [modalShow, setModalShow] = useState(false);
  const [idUserRol, setUser] = useState('');
  const [idUserInvt, setUserInvt] = useState('');
  const [updated, setUpdated] = useState(false);

  const showModalUpdate = (idUser, idInvit) => {
    setUpdated(false);
    setUser(idUser);
    setUserInvt(idInvit);
    setModalShow(!modalShow);
  };

  const showModalUpdateFunc = () => {
    setUpdated(false);
    setModalShow(!modalShow);
  };

  const updateRoleMember = (idInvit, userId) => {
    showModalUpdate(userId, idInvit);
  };

  const [hoverIdx, setHoverIdx] = useState(null);
  const [optionsToolTip] = useState([
    {
      option: 'Actualizar Rol',
      event: true,
      eventName: updateRoleMember,
      data: true,
      iconType: '6',
    },
    {
      option: 'Eliminar',
      event: true,
      eventName: deleteMemberFunc,
      data: true,
      iconType: 'L',
    },
  ]);

  const rowEvents = {
    onMouseEnter: (e, row, rowIndex) => {
      setHoverIdx(rowIndex);
    },
    onMouseLeave: () => {
      setHoverIdx(null);
    },
  };

  const columns = [{
    dataField: 'rol',
    text: 'Rol de usuario',
    formatter(_cell) {
      let rol = '';
      if (Roles.Admin === _cell) {
        rol = 'Administrador';
      } else if (Roles.Author === _cell) {
        rol = 'Colaborador';
      } else if (Roles.Premium === _cell) {
        rol = 'Premium';
      } else if (Roles.Reviewer === _cell) {
        rol = 'Curador';
      } else if (Roles.User === _cell) {
        rol = 'Usuario';
      }
      return <>{rol}</>;
    },
    headerClasses: 'wRol',
  }, {
    dataField: 'email',
    text: 'Correo electrónico',
    formatExtraData: { hoverIdx },
    formatter(_cell) {
      return (<div>{_cell}</div>);
    },
  }, {
    dataField: 'createdAt',
    text: 'Invitado en',
    formatter(_cell) {
      const dateCreated = new Date(_cell.replace(/-/g, '/').replace(/T.+/, ''));
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
      ];

      const date = `${monthNames[dateCreated.getUTCMonth()]} ${dateCreated.getUTCDay()}, ${dateCreated.getUTCFullYear()}`;
      return (<>{date}</>);
    },
  }, {
    dataField: 'isDummyField',
    isDummyField: true,
    text: '',
    align: 'right',
    // eslint-disable-next-line no-shadow
    formatter(_cell, row, rowIndex, { hoverId }) {
      if ((hoverId !== null || hoverId !== undefined) && hoverId === rowIndex) {
        return (
          <TooltipsMembers
            key={row._id}
            id={rowIndex}
            data={row}
            options={optionsToolTip}
            opacityCss="1"
          />
        );
      }
      return (<TooltipsMembers opacityCss="0" />);
    },
    formatExtraData: { hoverId: hoverIdx },
  },
  ];

  return (
    <div className={`table-responsive-lg ${styles.table_size_mb}`}>
      <BootstrapTable
        responsive
        bootstrap4
        keyField="_id"
        data={data}
        columns={columns}
        bordered={false}
        noDataIndication="No se encontraron resultados"
        headerClasses={styles.header_table}
        rowClasses={styles.row_table}
        rowEvents={rowEvents}
        hover
      />
      <DeleteModal
        show={modalDeleteH}
        onClose={() => setModalDelete(false)}
        functionDelete={() => onDelete()}
        btnConfirm={optionsModal.confirm}
        btnCancel={optionsModal.cancel}
        textHeader={optionsModal.textHeader}
        textBody={optionsModal.textBody}
      />
      <UpdateRolUserModal
        show={modalShow}
        idUserRol={idUserRol}
        idUserInvt={idUserInvt}
        showModal={showModalUpdateFunc}
        isUpdated={updated}
        mutate={mutate}
      />
    </div>
  );
};

TableMember.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  deleteMember: PropTypes.func.isRequired,
};

export default TableMember;
