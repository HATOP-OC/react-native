import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };
  
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught rendering error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Typography variant="h1" style={styles.title}>Упс! Щось пішло не так</Typography>
          <Typography variant="body" style={styles.message}>
            Ми вже знаємо про проблему. Спробуйте перезавантажити екран.
          </Typography>
          
          <View style={styles.errorBox}>
            <Typography variant="caption" style={styles.errorText}>
              {this.state.error?.message || 'Невідома помилка'}
            </Typography>
          </View>

          <Button title="Спробувати знову" onPress={this.handleReset} style={styles.button} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#F2F2F7' 
  },
  title: { fontSize: 22, marginBottom: 10, textAlign: 'center', color: '#000' },
  message: { fontSize: 16, color: '#8E8E93', textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  errorBox: {
    backgroundColor: '#FF3B3020',
    padding: 10,
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
  },
  errorText: { color: '#FF3B30', fontFamily: 'monospace' },
  button: { width: '100%' },
});