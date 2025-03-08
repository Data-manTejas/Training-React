import { Box, TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface User {
  id?: number;
  name: string;
  email: string;
  company: string;
  photo?: string;
}

interface UserFormProps {
  defaultValues?: User;
  onSubmit: (data: User) => void;
}

const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: defaultValues || {
      name: '',
      email: '',
      company: '',
      photo: '',
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="company"
        control={control}
        rules={{ required: 'Company is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Company"
            fullWidth
            margin="normal"
            error={!!errors.company}
            helperText={errors.company?.message}
          />
        )}
      />

      <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Photo URL (Optional)"
            fullWidth
            margin="normal"
          />
        )}
      />

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button type="submit" variant="contained" color="primary">
          {defaultValues?.id ? 'Update User' : 'Add User'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;