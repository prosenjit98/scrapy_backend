import { AppBar, Toolbar, Typography, Button, Box, InputBase, MenuItem, Select, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import UserDropdown from '~/pages/user_dropdown'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'


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
    id?: number;
    name?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    role?: 'buyer' | 'vendor';
    // Add other user properties as needed
    // avatar?: string; // Uncomment if avatar is implemented
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
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            component="a"
            href="/"
            sx={{ 
              color: theme.palette.primary.main,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<HelpOutlineIcon />}
            sx={{
              textTransform: 'none',
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              fontWeight: 500,
              borderRadius: 30,
              '&:hover': {
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.primary.dark,
              },
            }}
            aria-label="Open Inquire Modal"
            href='/inquiries/new'
          >
            Inquire
          </Button>
        </Box>
        

        {/* Login/Signup or Profile/Dashboard */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <>
              <ThemedOutlinedButton
                href={user?.id ? `/switch_to_selling/${user.id}` : '/switch_to_selling'}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(theme.palette.secondary.main),
                  ml: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                Switch to Selling
              </ThemedOutlinedButton>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <UserDropdown user={user} />
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar