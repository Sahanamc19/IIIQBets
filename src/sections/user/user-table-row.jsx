import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  name: initialName,
  avatarUrl,
  company: initialCompany,
  role: initialRole,
  isVerified: initialIsVerified,
  status,
  handleClick,
  handleDelete,
}) {
  const [open, setOpen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [company, setCompany] = useState(initialCompany);
  const [role, setRole] = useState(initialRole);
  const [isVerified, setIsVerified] = useState(initialIsVerified);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setName(initialName);
    setCompany(initialCompany);
    setRole(initialRole);
    setIsVerified(initialIsVerified);
    setIsEditing(false);
  };
  const handleDeleteUser = () => {
    handleDelete(id);
    window.alert('Are you sure you want to delete this data?');
  };

  let displayContent;
  if (isEditing) {
    displayContent = (
      <TextField value={isVerified} onChange={(e) => setIsVerified(e.target.value)} />
    );
  } else {
    displayContent = isVerified ? 'Yes' : 'No';
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            {isEditing ? (
              <TextField value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            )}
          </Stack>
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField value={company} onChange={(e) => setCompany(e.target.value)} />
          ) : (
            company
          )}
        </TableCell>

        <TableCell>
          {isEditing ? <TextField value={role} onChange={(e) => setRole(e.target.value)} /> : role}
        </TableCell>

        <TableCell align="center">{displayContent}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {isEditing ? (
          <>
            <MenuItem onClick={handleSave}>
              <Iconify icon="eva:save-fill" sx={{ mr: 2 }} />
              Save
            </MenuItem>

            <MenuItem onClick={handleCancel} sx={{ color: 'error.main' }}>
              Cancel
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleEdit}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  handleDelete: PropTypes.func,
  id: PropTypes.string,
};
