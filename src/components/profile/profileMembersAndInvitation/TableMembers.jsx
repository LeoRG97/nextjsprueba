import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import BootstrapTable from 'react-bootstrap-table-next';
import styles from './profileMembersAndInvitations.module.css';
import TooltipsMembers from './TooltipMembers';
import { DeleteModal, UpdateRolUserModal } from '@/components';
import { Roles } from '@/global/constants';
import { dateFormatter } from '@/helpers/dates';

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
      confirm: 'Deshabilitar cuenta',
      textHeader: 'Alerta',
      textBody: 'Estás apunto de deshabilitar la cuenta de este miembro. ¿Seguro que deseas continuar?',
    });
    setModalDelete(true);
  };

  const onDelete = () => {
    setModalDelete(false);
    deleteMember(optionsModal.fncConfirm);
  };

  const [modalShow, setModalShow] = useState(false);
  const [idUserRol, setUser] = useState('');
  // const [idUserInvt, setUserInvt] = useState('');
  const [updated, setUpdated] = useState(false);

  const showModalUpdate = (idUser) => {
    setUpdated(false);
    setUser(idUser);
    // setUserInvt(idInvit);
    setModalShow(!modalShow);
  };

  const showModalUpdateFunc = () => {
    setUpdated(false);
    setModalShow(!modalShow);
  };

  const updateRoleMember = (userId) => {
    showModalUpdate(userId);
  };

  const [hoverIdx, setHoverIdx] = useState(null);
  const [optionsToolTip] = useState([
    {
      option: 'Actualizar rol',
      event: true,
      eventName: updateRoleMember,
      data: true,
      iconType: '6',
    },
    {
      option: 'Deshabilitar',
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

  const setRole = (role) => {
    switch (role) {
      case (Roles.Admin): {
        return 'Administrador';
      }
      case (Roles.Reviewer): {
        return 'Curador';
      }
      case (Roles.Author): {
        return 'Colaborador';
      }
      case (Roles.Premium): {
        return 'Premium';
      }
      case (Roles.User): {
        return 'Usuario';
      }
      default:
        return '';
    }
  };

  const columns = [{
    dataField: 'role',
    sort: true,
    sortFunc: (a, b, order) => {
      const rolA = setRole(a);
      const rolB = setRole(b);
      if (order === 'asc') {
        return rolB < rolA;
      }
      return rolA < rolB;
    },
    text: 'Rol de usuario',
    formatter(_cell) {
      return setRole(_cell);
    },
    headerClasses: 'wRol',
  }, {
    dataField: 'email',
    sort: true,
    text: 'Correo electrónico',
    formatExtraData: { hoverIdx },
    formatter(_cell) {
      return (<div>{_cell}</div>);
    },
  }, {
    dataField: 'createdAt',
    text: 'Registrado en',
    sort: true,
    formatter(_cell) {
      if (_cell) {
        return dateFormatter(_cell);
      }
      return '';
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
            key={row.id}
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
        keyField="id"
        data={data}
        columns={columns}
        bordered={false}
        noDataIndication="No se encontraron resultados"
        headerClasses={styles.header_table}
        rowClasses={(row) => (row.estatus ? styles.row_table : `${styles.row_table} ${styles.row_table_disabled}`)}
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
