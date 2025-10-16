import { useState, useRef } from 'react';
import type {UserResponse} from "@/interfaces/authentication.ts";
import useUpdateUser from '@/hooks/useUpdateUser';
import useDeleteUser from '@/hooks/useDeleteUser';

interface ItemCardProps {
  item: UserResponse;
  onUpdate: () => void;
}

const ItemCard = ({item}: ItemCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const fullName = fullNameRef.current?.value || item.fullName;
    const email = emailRef.current?.value || item.email;
    const password = passwordRef.current?.value || '';

    const userData = {
      fullname: fullName,
      email: email,
      password: password || undefined,
    };

    updateUser(userData, {
      onSuccess: () => {
        setIsEditing(false);
        if (passwordRef.current) passwordRef.current.value = '';
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (passwordRef.current) passwordRef.current.value = '';
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    deleteUser(item.email);
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        {isEditing ? (
          <input
            ref={fullNameRef}
            type="text"
            defaultValue={item.fullName}
            className="edit-input"
            placeholder="Full Name"
            disabled={isUpdating}
          />
        ) : (
          <h3 className="item-title">{item.fullName}</h3>
        )}
      </div>

      <div className="item-content">
        {isEditing ? (
          <>
            <div className="form-group-inline">
              <label>Email:</label>
              <input
                ref={emailRef}
                type="email"
                defaultValue={item.email}
                className="edit-input"
                placeholder="Email"
                disabled={isUpdating}
              />
            </div>
            <div className="form-group-inline">
              <label>New Password (optional):</label>
              <input
                ref={passwordRef}
                type="password"
                className="edit-input"
                placeholder="Leave blank to keep current"
                disabled={isUpdating}
              />
            </div>
          </>
        ) : (
          <>
            <div className="item-email">{item.email}</div>
            <div className="item-meta">
              <span className="item-date">ID: {item.id}</span>
            </div>
          </>
        )}
      </div>

      <div className="item-actions">
        {isEditing ? (
          <>
            <button
              className="btn-primary btn-sm"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              className="btn-secondary btn-sm"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-secondary btn-sm"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="btn-danger btn-sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
