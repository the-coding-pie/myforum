import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { emptyToasts, removeToast } from "../../features/toastSlice";
import { DEFAULT, ERROR, INFO, SUCCESS, WARNING } from "../../types/constants";

const Toasts = () => {
  const { toasts } = useSelector((state: RootState) => state.toasts);

  const dispatch = useDispatch();

  toasts &&
    toasts.forEach((t) => {
      if (t.kind === ERROR)
        toast.error(t.msg, {
          toastId: t.kind + t.msg,
          onClose: () => {
            dispatch(removeToast(t));
          },
        });
      if (t.kind === SUCCESS)
        toast.success(t.msg, {
          toastId: t.kind + t.msg,
          onClose: () => {
            dispatch(removeToast(t));
          },
        });
      if (t.kind === INFO)
        toast.info(t.msg, {
          toastId: t.kind + t.msg,
          onClose: () => {
            dispatch(removeToast(t));
          },
        });
      if (t.kind === WARNING)
        toast.warn(t.msg, {
          toastId: t.kind + t.msg,
          onClose: () => {
            dispatch(removeToast(t));
          },
        });
      if (t.kind === DEFAULT)
        toast(t.msg, {
          toastId: t.kind + t.msg,
          onClose: () => {
            dispatch(removeToast(t));
          },
        });
    });

  return <></>;
};

export default Toasts;
