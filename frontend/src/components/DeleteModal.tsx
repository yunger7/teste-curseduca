import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Text, Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

type DeleteModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export const DeleteModal = (props: DeleteModalProps) => {
  const { opened, onClose, onConfirm } = props;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);

    try {
      await onConfirm();
      navigate(0);
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Wops! Parece que alguma coisa deu errado :(',
        message:
          'Não foi possível concluir a ação, tente novamente mais tarde.',
        color: 'red',
      });
    }

    setLoading(false);
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Excluir post">
      <Text size="sm">
        Tem certeza que deseja excluir esse post? Essa ação não pode ser
        desfeita.
      </Text>
      <Group mt="sm" position="right">
        <Button variant="default" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="red" loading={loading} onClick={handleConfirm}>
          Excluir
        </Button>
      </Group>
    </Modal>
  );
};
