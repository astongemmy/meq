import { Layout, Flex, Card, Space, Avatar, Carousel, Rate } from 'antd';
import Title from 'antd/es/typography/Title';
import Meta from 'antd/es/card/Meta';
import type { Metadata } from 'next';
import Image from 'next/image';

import { ContentWrapper, LayoutWrapper, SiderWrapper } from './layout.styled';

export const metadata: Metadata = {
  title: {
    template: "%s | Mega Quest Authentication",
    default: "Mega Quest Authentication",
  },
};

const tips = [
  {
    content: [
      'We used traditional data collection with google forms. Then we used MegaQuest and compared the response rates, data quality and richness of insights. MegaQuest performed 800% times better'
    ],
    avatar: '/images/reviews/eva-sawyer.svg',
    title: 'CEO, Fashworks',
    reviewer: 'Eva Sawyer',
    isListContent: false,
    rating: 3.5
  },
  {
    content: [
      'Serve more clients in 1/10th of the time.',
      'Save time, quit suffering to access insights.',
      'Hear the truth exactly as it was said.',
      'Conduct 100’s-1000’s of interviews if you wish.'
    ],
    avatar: '/images/reviews/eva-sawyer.svg',
    title: 'CEO, Fashworks',
    reviewer: 'Eva Sawyer',
    isListContent: true,
    rating: 5
  }
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
                    Deep Insights for the Truly Curious
                  </Title>

                  <Title level={2}>
                    Capture Qualitative data Via voice, remotely and at scale. Access deep insights in seconds by conversing with your verbal datasets.
                  </Title>
                </Space>

                <Space direction="vertical" size="large">
                  <Carousel autoplay>
                    {tips.map(({ isListContent, reviewer, content, rating, title, avatar }, index) => (
                      <Card
                        key={reviewer + index}
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
                        
                        {content.map((text) => (
                          <p key={text}>
                            {isListContent && (
                              <Image
                                src="/images/icons/tick-square.svg"
                                alt="tick_icon"
                                height={24}
                                width={24}
                              />
                            )}
                            
                            {text}
                          </p>
                        ))}
                        
                        <div className="card-meta">
                          <Meta
                            avatar={<Avatar src={avatar} size="large" shape="square" />}
                            description={title}
                            title={reviewer}
                          />
                          
                          <Rate allowHalf defaultValue={rating} />
                        </div>
                      </Card>
                    ))}
                  </Carousel>

                  <Flex justify="space-between" gap={8} style={{ overflow: 'auto' }}>
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
