'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';

import { useAppSelector } from '@/store/hooks';
import colors from '@/lib/colors';

const AntDesignThemeProvider = ( { children }: { children: React.ReactNode }) => {
  const { mode } = useAppSelector(state => state.theme);
  
  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: 'var(--font-rethink-sans)',
          colorWarning: colors.theme.secondary,
          colorPrimary: colors.theme.primary,
        },
        components: {
          Button: {
            colorPrimary: colors.theme.secondary,
            paddingContentHorizontal: 16,
            paddingContentVertical: 12,
            controlHeight: 44,
            borderRadius: 12,
            algorithm: true,
            fontWeight: 400,
            lineHeight: 20,
            size: 16,
          },
          Input: {
            borderRadius: 16,
            algorithm: true,
          },
        }
      }}
    >
      <AntdRegistry>
        {children}
      </AntdRegistry>
    </ConfigProvider>
  );
};

export default AntDesignThemeProvider;