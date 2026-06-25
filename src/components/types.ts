import { LucideIcon } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  SVGProps,
  ComponentType,
  ReactNode
} from "react";

export type Theme = 'dark' | 'light' | 'system';

export interface Title {
  txt: string;
  className?: string;
}

export interface SpanProps extends Title {
  children?: ReactNode;
}

export interface ParagraphProps {
  txt: string;
  className?: string;
}

export interface MiniTitleProps {
  children: ReactNode;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  alt?: string;
  img?: string | null;
  svg?: ComponentType<SVGProps<SVGSVGElement>> | string;
  fillcolor?: string;
  txt?: string | null;
  className?: string;
  txtcolor?: string;
}

export interface LinkButtonProps extends ButtonProps {
  link: string;
}

export interface LinkItem {
  id: string;
  name: string;
}

export interface NavProps {
  link: string;
  txt: string;
}

export interface NavBarContent {
  button: string;
  links: LinkItem[];
}

export interface NavBarProps {
  initialData: NavBarContent | null;
}

export interface AnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export interface HeroLabelProps {
  content: string;
}

export interface HeroTagProps {
  content: string;
}

export interface HeroProps {
  content: {
    firm: string;
    title: string;
    subtitle: string;
    card: {
      paragraph: string;
      promise: string;
      smallcard: string[];
    };
    brand: string[];
  };
}

export interface EthicsCard {
  title: string;
  paragraph: string;
}

export interface EthicsProps {
  content: {
    minititle: string;
    title: string;
  };
  article: EthicsCard[];
}

export interface EthicCardProps {
  content: EthicsCard;
  delay: number;
  index: number;
}

export interface Differentiator {
  vs: string;
  title: string;
  description: string;
}

export interface DifferentiatorMetric {
  value: string;
  description: string;
}

export interface DifferentiatorProps {
  content: {
    minititle: string;
    subtitle: string;
    title: string;
    paragraph: string;
  };
  diferentiators: Differentiator[];
  metrics: DifferentiatorMetric[];
}

export interface DifferentiatorCardProps {
  content: Differentiator;
  delay: number;
}

export interface DifferentiatorMetricProps {
  content: DifferentiatorMetric;
}

export interface IpmStep {
  title: string;
  description: string;
  prods: string;
}

export interface IpmMethodProps {
  content: {
    minititle: string;
    title: string;
    paragraph: string;
    button: string;
  };
  article: IpmStep[];
}

export interface IpmMethodCardProps {
  content: IpmStep;
  delay: number;
  index: number;
}

export interface IpmStateCard {
  score: string;
  state: string;
  recomendations: string;
}

export interface IpmScoreProps {
  content: {
    minititle: string;
    title: string;
    description: string;
  };
  quote: {
    title: string;
    paragraph: string;
  };
  statescard: IpmStateCard[];
  dimensions: {
    minititle: string;
    card: string[];
  };
}

export interface IpmStateCardProps {
  content: IpmStateCard;
}

export interface IpmDimensionsCardProps {
  content: string;
  delay: number;
}

export interface ServiceCard {
  minititle: string;
  title: string;
  description: string;
  prods: string[];
  icon?: LucideIcon;
}

export interface ServicesProps {
  content: {
    minititle: string;
    title: string;
    description: string;
  };
  card: ServiceCard[];
}

export interface ServiceCardProps {
  content: ServiceCard;
  delay: number;
}

export interface PersonaCard {
  title: string;
  paragraph: string;
}

export interface PersonasProps {
  content: {
    minititle: string;
    title: string;
  };
  card: PersonaCard[];
}

export interface PersonaCardProps {
  content: PersonaCard;
  delay: number;
  index: number;
}

export interface MessageCard {
  who: string;
  title: string;
  message: string;
  ch: string[];
}

export interface MessagesProps {
  content: {
    minititle: string;
    title: string;
  };
  messages: MessageCard[];
}

export interface MessageCardProps {
  content: MessageCard;
  delay: number;
}

export interface Article {
  title: string;
  paragraph: string;
  read: string;
}

export interface AcademyProps {
  content: {
    minititle: string;
    title: string;
  };
  articles: Article[];
}

export interface ArticleProps {
  content: Article;
  delay: number;
}

export interface MetricItem {
  value: string;
  label: string;
  bar: number;
}

export interface TrackRecordProps {
  content: {
    minititle: string;
  };
  growth: {
    minititle: string;
    percentage: string;
    paragraph: string;
    years: string;
  };
  metrics: {
    title: string;
    card: MetricItem[];
  };
  sectors: {
    title: string;
    paragraph: string;
    card: { title: string }[];
  };
}

export interface TrackRecordMetricsCardProps {
  content: MetricItem;
  delay: number;
}

export interface TrackRecordSectorCardProps {
  content: { title: string };
  index: number;
}

export interface FooterData {
  description: string;
  eslogan: string;
  legal: string;
  mici: string;
  email: string;
  links: LinkItem[];
}

export interface FooterProps {
  data: FooterData;
}

export interface CtaFormContent {
  placeholder: string;
  button: string;
}

export interface CtaFormProps {
  content: CtaFormContent;
}

export interface CtaSectionProps {
  content: {
    minititle: string;
    title: string;
    paragraph: string;
    eslogan: string;
    email: string;
  };
  form: CtaFormContent;
}

export interface BrandBarProps {
  brands: string[];
}

export interface ErrorPageProps {
  message: string;
  onRetry?: () => void;
}

export type FormInputProps = {
  type: string;
  placeholder: string;
  id: string;
  issues?: string;
};

export type otherLogin = {
  name: string;
  action: (e: React.FormEvent) => Promise<void>;
};

export interface AuthPanel {
  title: string;
  paragraph: string;
  toggle: string;
}

export interface SignUpContent {
  panel: AuthPanel;
  button: string;
  title: string;
  othermethod: string;
  input: FormInputProps[];
}

export interface SignInContent extends SignUpContent {
  recovery: string;
}

export interface LoginForm {
  signUp: SignUpContent;
  signIn: SignInContent;
}

export interface LoginFormProps {
  loading: boolean;
  data: LoginForm;
  signIn: (e: React.FormEvent) => Promise<void>;
  signUp: (e: React.FormEvent) => Promise<void>;
  otherSignIn: otherLogin[];
  otherSignUp: otherLogin[];
  recovery: (e: React.FormEvent) => Promise<void>;
}
