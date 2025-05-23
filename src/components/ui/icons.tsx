import {
  AlertCircle,
  Archive,
  ArrowRight,
  BarChart3,
  Bell,
  Briefcase,
  Building,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Folder,
  Home,
  Info,
  Laptop,
  Loader2,
  Lock,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Smile,
  SunMedium,
  Trash2,
  User,
  Users,
  X,
  type LucideProps,
} from "lucide-react";

export type Icon = keyof typeof Icons;

export const Icons = {
  logo: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
    </svg>
  ),
  calendar: CalendarDays,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  spinner: Loader2,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  home: Home,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreHorizontal,
  download: Download,
  external: ExternalLink,
  help: CircleHelp,
  users: Users,
  user: User,
  building: Building,
  add: Plus,
  search: Search,
  filter: Filter,
  trash: Trash2,
  menu: Menu,
  clipboardList: ClipboardList,
  briefcase: Briefcase,
  fileText: FileText,
  pieChart: PieChart,
  barChart: BarChart3,
  archive: Archive,
  message: MessageSquare,
  info: Info,
  warning: AlertCircle,
  smile: Smile,
  bell: Bell,
  cart: ShoppingCart,
  folder: Folder,
  eye: Eye,
  eyeOff: EyeOff,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  clock: Clock,
  lock: Lock,
};