import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase, MenuItem, Select, useMediaQuery, Avatar } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import UserDropdown from '../user_dropdown'
import UserFormModal from '../UserAuth/user_form_modal'



function Header() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <UserDropdown />
    </Box>
  )
}

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: '4px 16px',
  borderRadius: 50,
  width: '100%',
  maxWidth: 600,
  boxShadow: '0 1px 5px rgba(0,0,0,0.08)'
}))

const ThemedOutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  textTransform: 'none',
  fontWeight: 600,
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.dark
  }
}))

interface NavBarProps {
  user: {
    name?: string;
    avatar?: string;
  } | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');
  const isLoggedIn = !!user;
  console.log('User:', user);
  console.log('Is Logged In:', isLoggedIn);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        {/* Logo and City Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
            ScrapBro
          </Typography>
          <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
          <Select
            size="small"
            defaultValue="all"
            sx={{
              borderRadius: 8,
              height: 36,
              minWidth: 120,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="all">All cities</MenuItem>
            <MenuItem value="delhi">Delhi</MenuItem>
            <MenuItem value="mumbai">Mumbai</MenuItem>
            <MenuItem value="bangalore">Bangalore</MenuItem>
          </Select>
        </Box>

        {/* Search */}
        {!isMobile && (
          <SearchBar>
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
            <InputBase
              placeholder="Search parts"
              sx={{ ml: 1, flex: 1, color: theme.palette.text.primary }}
            />
          </SearchBar>
        )}

        {/* Login/Signup or Profile/Dashboard */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <UserDropdown />
              </Box>
            </>
          ) : (
            <>
              <Button
                href="/login"
                sx={{
                  textTransform: 'none',
                  color: '#0d47a1',
                  fontWeight: 500,
                }}
              >
                Log in
              </Button>
              <ThemedOutlinedButton href="/signup" variant="outlined" size="small">
                Signup
              </ThemedOutlinedButton>
            </>
          )}
          <IconButton sx={{ color: theme.palette.primary.main }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar