import React from 'react'
import styled from '@emotion/styled'
import { themeColors } from './settings'
import Logo from './Logo'
import { Link } from './Button'
import { FaTwitter, FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${themeColors.dark};
  color: ${themeColors.light};
  padding: 3em 1em;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FooterColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FooterColumn = styled.div`
  flex: 1;
  min-width: 250px;
  margin: 1em 0;
`

const FooterTitle = styled.h4`
  margin-bottom: 1em;
  color: ${themeColors.primary};
`

const FooterLink = styled(Link)`
  display: block;
  color: ${themeColors.light};
  text-decoration: none;
  margin: 0.5em 0;
  transition: color 0.3s;

  &:hover {
    color: ${themeColors.primary};
  }
`

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1em;
`

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  margin-right: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${themeColors.light};
  background-color: ${themeColors.lightGrey};
  border-radius: 50%;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: ${themeColors.primary};
    color: #fff;
  }
`

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
`

const NewsletterInput = styled.input`
  padding: 0.5em;
  border: 1px solid ${themeColors.grey};
  border-radius: 4px;
  margin-bottom: 1em;
`

const NewsletterButton = styled.button`
  padding: 0.5em;
  color: #000;
  background-color: ${themeColors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${themeColors.secondary};
  }
`

const CopyRight = styled.p`
  text-align: center;
  margin-top: 2em;
  color: ${themeColors.grey};
  font-size: 0.8em;
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumns>
          {/* Company Info */}
          <FooterColumn>
            <Logo size="60px" iso={false} />
            <p>
              Reactour helps you create guided tours in your React apps with ease.
            </p>
            {/* Social Media Icons */}
            <SocialIcons>
              <SocialIcon
                href="https://twitter.com/elrumordelaluz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </SocialIcon>
              <SocialIcon
                href="https://github.com/elrumordelaluz/reactour"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </SocialIcon>
              <SocialIcon
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </SocialIcon>
            </SocialIcons>
          </FooterColumn>

          {/* Navigation Links */}
          <FooterColumn>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink
              href="https://docs.react.tours"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </FooterLink>
            <FooterLink
              href="https://github.com/elrumordelaluz/reactour"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterColumn>

          {/* Newsletter Subscription */}
          <FooterColumn>
            <FooterTitle>Newsletter</FooterTitle>
            <p>Subscribe to our newsletter for the latest updates.</p>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Your email address" />
              <NewsletterButton type="submit">Subscribe</NewsletterButton>
            </NewsletterForm>
          </FooterColumn>
        </FooterColumns>
        {/* Copyright */}
        <CopyRight>
          © {new Date().getFullYear()} Reactour. All rights reserved.
        </CopyRight>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer