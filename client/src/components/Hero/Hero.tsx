import styled from "styled-components";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1665989215795-f67f4723087d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
  background-size: cover;
  background-alignment: center;
`

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem
`
const Heading = styled.h1`
  font-size: 5rem;
`

const Subheading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`

const Hero = () => {
  return ( 
    <HeroComponent>
      <HeaderContainer>
        <Heading>Feed your mind with the best</Heading>
        <Subheading>
          Grow, learn, and be more aware of food options that will lead to a healthier lifestyle.
        </Subheading>
      </HeaderContainer>
    </HeroComponent>
   );
}
 
export default Hero;