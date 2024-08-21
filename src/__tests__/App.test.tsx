import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';import App from '../App';

describe('App Component', () => {
  it('renders login form', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('updates form state on input change', () => {
    render(<App />);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('toggles remember me checkbox', () => {
    render(<App />);
    const rememberMeCheckbox = screen.getByLabelText('Remember me') as HTMLInputElement;

    expect(rememberMeCheckbox.checked).toBe(false);
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  it('calls handleSubmit on form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<App />);
    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(consoleSpy).toHaveBeenCalledWith('form', expect.any(Object));
    consoleSpy.mockRestore();
  });

  it('renders forget password link', () => {
    render(<App />);
    const forgetPasswordLink = screen.getByText('Forget password?');
    expect(forgetPasswordLink).toBeInTheDocument();
    expect(forgetPasswordLink).toHaveAttribute('href', '#');
  });

  it('renders sign in and log out buttons', () => {
    render(<App />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });
});
