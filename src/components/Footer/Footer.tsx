import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { styled } from "@mui/system";
import { FaLeaf, FaRecycle, FaSeedling, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "#f5f7f2",
  padding: theme.spacing(6, 0),
  marginTop: "auto",
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: "all 0.3s ease",
  color: "#2e7d32",
  "&:hover": {
    transform: "scale(1.1)",
    color: "#1b5e20",
    backgroundColor: "rgba(46, 125, 50, 0.1)",
  },
}));

const FooterLink = styled(Link)({
  color: "#2e7d32",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#1b5e20",
  },
});

const EcoFooter = () => {

  const initiatives = [
    {
      title: "Carbon Neutral",
      icon: <FaLeaf />,
      description: "Our commitment to reducing carbon footprint",
    },
    {
      title: "Zero Waste",
      icon: <FaRecycle />,
      description: "Working towards a waste-free future",
    },
    {
      title: "Green Energy",
      icon: <FaSeedling />,
      description: "100% renewable energy usage",
    },
  ];

  return (
    <StyledFooter role="contentinfo" style={{background: "#1976d2"}} aria-label="Site footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="#fff" gutterBottom>
              Foods
            </Typography>
            <Typography variant="body2" color="#fff" sx={{ mb: 2 }}>
              We're dedicated to creating a sustainable future through eco-friendly practices and environmental stewardship.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SocialIcon aria-label="Twitter">
                <Link href="#" color="#fff">
                  <FaTwitter />
                </Link>
              </SocialIcon>
              <SocialIcon aria-label="Facebook">
                <Link href="#" color="#fff">
                  <FaFacebookF />
                </Link>
              </SocialIcon>
              <SocialIcon aria-label="Instagram">
                <Link href="#" color="#fff">
                  <FaInstagram />
                </Link>
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn">
                <Link href="#" color="#fff">
                  <FaLinkedinIn />
                </Link>
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="#fff" gutterBottom>
              Environmental Initiatives
            </Typography>
            <Grid container spacing={2}>
              {initiatives.map((initiative) => (
                <Grid item xs={12} key={initiative.title}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ color: "#fff" }}>{initiative.icon}</Box>
                    <Box>
                      <Typography variant="subtitle2" color="#fff">
                        {initiative.title}
                      </Typography>
                      <Typography variant="body2" color="#fff">
                        {initiative.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="#fff" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FooterLink href="#" aria-label="Read about our sustainability practices" style={{color: "#fff"}}>
                Sustainability Report
              </FooterLink>
              <FooterLink href="#" aria-label="Learn about our partnerships" style={{color: "#fff"}}>
                Environmental Partners
              </FooterLink>
              <FooterLink href="#" aria-label="View our certifications" style={{color: "#fff"}}>
                Green Certifications
              </FooterLink>
              <FooterLink href="#" aria-label="Join our eco-friendly initiatives" style={{color: "#fff"}}>
                Get Involved
              </FooterLink>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid #90a4ae",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="#fff">
            © {new Date().getFullYear()} Foods. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default EcoFooter;