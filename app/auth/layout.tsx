import { Layout, Flex, Card, Space, Avatar } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Metadata } from 'next';
import Image from 'next/image';

import { ContentWrapper, LayoutWrapper, SiderWrapper } from './layout.styled';
import Meta from 'antd/es/card/Meta';
import { StarFilled } from '@ant-design/icons';

export const metadata: Metadata = {
  title: {
    template: "%s | Mega Quest Authentication",
    default: "Mega Quest Authentication",
  },
};

const cardItems = [
  'Serve more clients in 1/10th of the time.',
  'Save time, quit suffering to access insights.',
  'Hear the truth exactly as it was said.',
  'Conduct 100’s-1000’s of interviews if you wish.'
];

const featureItems = [
  {
    icon: '/images/icons/clipboard-text.svg',
    alt: 'clipboard_icon',
    text: 'Survey'
  },
  {
    icon: '/images/icons/microphone.svg',
    alt: 'microphone_icon',
    text: 'Voice'
  },
  {
    icon: '/images/icons/messages.svg',
    alt: 'messages_icon',
    text: 'Gen Ai'
  },
  {
    icon: '/images/icons/document-text.svg',
    alt: 'document_icon',
    text: 'Interviews',
  }
];

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Flex gap="middle" wrap="wrap">
          <LayoutWrapper>
            <SiderWrapper width="40%">
              <Flex className="container">
                <Space direction="vertical">
                  <Image
                    src="/images/logos/mega-quest-logo-white.svg"
                    alt="megaquest_logo"
                    width={175}
                    height={33}
                    priority
                  />

                  <Title>
                    Transformative<br />
                    Frontiers: Rethinking Possibilities in Research
                  </Title>

                  <Title level={2}>
                    Capture Qualitative data Via voice, remotely and at scale. Access deep insights in seconds by conversing with your verbal datasets.
                  </Title>
                </Space>

                <Space direction="vertical" size="large">
                  <Card
                    bordered={false}
                    className="card"
                    title={
                      <div>
                        <Image
                          src="/images/icons/trophy.svg"
                          alt="trophy_icon"
                          height={30}
                          width={30}
                        />
                        800x better performance
                      </div>
                    }
                  >
                    {/* {cardItems.map((text) => (
                      <p key={text}>
                        <Image
                          src="/images/icons/tick-square.svg"
                          alt="tick_icon"
                          height={24}
                          width={24}
                        />
                        {text}
                      </p>
                    ))} */}

                    <p>
                      We used traditional data collection with google forms. Then we used MegaQuest and compared the response rates, data quality and richness of insights. MegaQuest performed 800% times better
                    </p>

                    <div className="card-meta">
                      <Meta
                        avatar={<Avatar src="/images/reviews/eva-sawyer.svg" />}
                        description="CEO, Fashworks"
                        title="Eva Sawyer"
                      />

                      <span>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                      </span>
                    </div>
                  </Card>

                  <Flex justify="space-between" gap={2}>
                    {featureItems.map(({ text, icon, alt }) => (
                      <span key={text} className="badge">
                        <Image src={icon} alt={alt} height={24} width={24} />
                        {text}
                      </span>
                    ))}
                  </Flex>
                </Space>
              </Flex>
            </SiderWrapper>

            <Layout>
              <ContentWrapper>
                {children}
              </ContentWrapper>
            </Layout>
          </LayoutWrapper>
        </Flex>
      </body>
    </html>
  );
};

export default RootLayout;
