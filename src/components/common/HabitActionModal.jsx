import { motion } from 'framer-motion';
import Button from './Button';

function HabitActionModal({ isOpen, onClose, onAction, habitTitle, actionType }) {
  if (!isOpen) return null;

  const isDelete = actionType === 'delete';
  const isEdit = actionType === 'edit';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSingleAction = () => {
    onAction('single');
    onClose();
  };

  const handleFutureAction = () => {
    onAction('future');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-surface rounded-3xl shadow-2xl p-6 max-w-md w-full border border-white/10"
      >
        <h2 className="text-xl font-semibold text-primary-text mb-2">
          {isDelete ? 'Eliminar Hábito' : 'Editar Hábito'}
        </h2>
        <p className="text-sm text-primary-muted mb-6">
          <span className="font-medium text-primary-text">"{habitTitle}"</span>
          {' es un hábito recurrente. ¿Qué deseas hacer?'}
        </p>

        <div className="space-y-3">
          <Button
            variant={isDelete ? 'danger' : 'primary'}
            onClick={handleSingleAction}
            className="w-full justify-start"
          >
            <div className="text-left">
              <div className="font-medium">
                {isDelete ? 'Eliminar' : 'Editar'} solo esta instancia
              </div>
              <div className="text-xs opacity-80 font-normal">
                {isDelete
                  ? 'Las próximas instancias seguirán apareciendo'
                  : 'Solo modificar esta tarea específica'}
              </div>
            </div>
          </Button>

          <Button
            variant={isDelete ? 'danger' : 'primary'}
            onClick={handleFutureAction}
            className="w-full justify-start"
          >
            <div className="text-left">
              <div className="font-medium">
                {isDelete ? 'Eliminar' : 'Editar'} todas las instancias futuras
              </div>
              <div className="text-xs opacity-80 font-normal">
                {isDelete
                  ? 'Eliminar esta y todas las próximas ocurrencias'
                  : 'Aplicar cambios a esta y todas las instancias futuras'}
              </div>
            </div>
          </Button>

          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancelar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default HabitActionModal;
