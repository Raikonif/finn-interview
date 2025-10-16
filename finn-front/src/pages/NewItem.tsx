import {useState, type FormEvent, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateUser from "@/hooks/useCreateUser";

const NewItem = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending, isSuccess } = useCreateUser();

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullName = fullNameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      fullname: fullName,
      email: email,
      password: password
    };

    mutate(userData, {
      onSuccess: () => {
        setTimeout(() => {
          navigate('/items');
        }, 2000);
      },
      onError: () => {
        setError('Failed to create user. Please try again.');
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="page-container">
        <div className="success-message">
          <h2>User Created Successfully!</h2>
          <p>Redirecting to items list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create User</h1>
        <p>Add a new user to your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="item-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            ref={fullNameRef}
            disabled={isPending}
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            ref={emailRef}
            disabled={isPending}
            placeholder="Enter email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            ref={passwordRef}
            disabled={isPending}
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password *</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
            ref={confirmPasswordRef}
            disabled={isPending}
            placeholder="Confirm password"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/items')}
            className="btn-secondary"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewItem;
