# DFM Stock Site - Navigation Map & User Flow

## 🗺️ Site Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        DFM STOCK SITE                          │
├─────────────────────────────────────────────────────────────────┤
│  🏠 Home  │  📊 Stocks  │  📈 Market  │  ⭐ Watchlist  │  📰 News  │  👤 Profile  │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 Page Hierarchy & User Flow

### 🏠 **Home Page** (Landing Page)
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [Logo] DFM Stock Site  [Search]  [Login/Register]  [Theme]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Market        │  │   Top           │  │   Quick         │  │
│  │   Overview      │  │   Gainers       │  │   Actions       │  │
│  │                 │  │                 │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    STOCK LIST TABLE                         │ │
│  │  Symbol │ Name │ Price │ Change% │ Volume │ Market Cap │ ⭐  │ │
│  │  EMAAR  │ ...  │ 4.25  │ +2.1%   │ 1.2M   │ 15.2B     │ ★  │ │
│  │  DU     │ ...  │ 2.85  │ -1.3%   │ 890K   │ 8.7B      │ ☆  │ │
│  │  ENBD   │ ...  │ 12.50 │ +0.8%   │ 2.1M   │ 25.4B     │ ★  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Previous] [1] [2] [3] [4] [5] [Next] - Page 1 of 15          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **Stock Row Click** → Stock Detail Page
- **Star Icon Click** → Add/Remove from Watchlist
- **Search** → Filtered Stock List
- **Market Overview** → Market Page
- **Login/Register** → Authentication Pages

---

### 📊 **Stock Detail Page**
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [← Back]  EMAAR Properties  [⭐ Add to Watchlist]  [Share]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    STOCK HEADER                             │ │
│  │  EMAAR Properties PJSC  │  AED 4.25  │  +0.08 (+1.92%)     │ │
│  │  Real Estate Sector     │  Volume: 1.2M  │  Market Cap: 15.2B │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    PRICE CHART                              │ │
│  │  [1D] [1W] [1M] [3M] [1Y] [5Y]  [📊 Technical Indicators] │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │                                                         │ │ │
│  │  │                    Chart Area                          │ │ │
│  │  │                                                         │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Key Metrics   │  │   Company       │  │   Trading       │  │
│  │   P/E: 12.5     │  │   Info          │  │   Info          │  │
│  │   P/B: 1.2      │  │                 │  │                 │  │
│  │   Div Yield: 3% │  │                 │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    RELATED NEWS                             │ │
│  │  • EMAAR announces Q3 results...                           │ │
│  │  • New development project launched...                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **Back Button** → Previous Page
- **Add to Watchlist** → Update Watchlist
- **Technical Indicators** → Advanced Chart View
- **Related News** → News Detail Page
- **Company Info** → Expand Company Details

---

### 📈 **Market Overview Page**
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [← Back]  Market Overview  [Refresh]  [Export Data]           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    MARKET INDICES                           │ │
│  │  DFM General Index: 3,245.67  │  +45.23 (+1.41%)           │ │
│  │  DFM Shariah Index: 1,234.56  │  +12.34 (+1.01%)           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Market        │  │   Top           │  │   Sector        │  │
│  │   Statistics    │  │   Performers    │  │   Performance   │  │
│  │   Total Cap:    │  │   Gainers       │  │   Banking: +2.1% │ │
│  │   450.2B AED    │  │   Losers        │  │   Real Estate:   │ │
│  │   Volume: 2.1B  │  │   Most Active   │  │   +1.8%         │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    MARKET BREADTH                           │ │
│  │  Advancing: 45  │  Declining: 12  │  Unchanged: 8        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    SECTOR PERFORMANCE CHART                 │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │                    Chart Area                          │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **Back Button** → Previous Page
- **Top Performers** → Filtered Stock List
- **Sector Performance** → Sector Detail View
- **Export Data** → Download Market Data

---

### ⭐ **Watchlist Page**
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [← Back]  My Watchlist  [➕ Add Stock]  [⚙️ Settings]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    WATCHLIST SUMMARY                        │ │
│  │  Total Value: AED 125,450  │  Today's Change: +2,340 (+1.9%) │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    WATCHLIST TABLE                          │ │
│  │  Symbol │ Name │ Price │ Change% │ Target │ Alert │ Actions │ │
│  │  EMAAR  │ ...  │ 4.25  │ +2.1%   │ 4.50   │ 4.00  │ [📊] [❌] │ │
│  │  DU     │ ...  │ 2.85  │ -1.3%   │ 3.00   │ 2.70  │ [📊] [❌] │ │
│  │  ENBD   │ ...  │ 12.50 │ +0.8%   │ 13.00  │ 12.00 │ [📊] [❌] │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    PERFORMANCE CHART                        │ │
│  │  [1D] [1W] [1M] [3M] [1Y]  [Portfolio Performance]         │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │                    Chart Area                          │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **Add Stock** → Stock Selection Modal
- **Stock Row Click** → Stock Detail Page
- **📊 Chart Icon** → Stock Chart View
- **❌ Remove Icon** → Remove from Watchlist
- **Settings** → Watchlist Preferences

---

### 📰 **News Page**
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [← Back]  News & Updates  [Search]  [Filter]  [Subscribe]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    NEWS CATEGORIES                          │ │
│  │  [All] [Market] [Companies] [Economy] [Regulation] [Tech]  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    FEATURED NEWS                            │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  📰 DFM General Index Reaches New High                 │ │ │
│  │  │  The Dubai Financial Market General Index closed at... │ │ │
│  │  │  [Read More]  [2 hours ago]  [Market]                  │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    NEWS LIST                                │ │
│  │  • EMAAR Properties Q3 Results Exceed Expectations        │ │
│  │  • New Banking Regulations Announced                       │ │
│  │  • Technology Sector Shows Strong Growth                   │ │
│  │  • Real Estate Market Update                               │ │
│  │  • Economic Indicators for Q4 2024                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Previous] [1] [2] [3] [4] [5] [Next] - Page 1 of 25          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **News Item Click** → News Detail Page
- **Category Filter** → Filtered News List
- **Search** → Search News Articles
- **Subscribe** → Newsletter Subscription

---

### 👤 **Profile Page**
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [← Back]  My Profile  [Edit]  [Settings]  [Logout]            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    PROFILE INFORMATION                      │ │
│  │  [Avatar]  John Doe  │  john.doe@email.com                 │ │
│  │  Member since: January 2024  │  Last login: Today 10:30 AM │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Account       │  │   Preferences   │  │   Statistics    │ │
│  │   Settings      │  │   Theme: Dark   │  │   Watchlists: 3 │ │
│  │   Password      │  │   Notifications │  │   Stocks: 15    │ │
│  │   Email         │  │   Alerts        │  │   Logins: 45    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    RECENT ACTIVITY                          │ │
│  │  • Added EMAAR to watchlist (2 hours ago)                  │ │
│  │  • Viewed DU stock details (1 day ago)                     │ │
│  │  • Updated profile settings (3 days ago)                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Navigation Paths:**
- **Edit** → Edit Profile Form
- **Settings** → Account Settings
- **Account Settings** → Password/Email Management
- **Preferences** → Theme/Notification Settings

---

### 🔐 **Authentication Pages**

#### Login Page
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [Logo] DFM Stock Site  [Home]  [About]  [Contact]             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────────┐                         │
│                    │     LOGIN       │                         │
│                    ├─────────────────┤                         │
│                    │                 │                         │
│                    │  Email:         │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  Password:      │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  [Remember Me]  │                         │
│                    │                 │                         │
│                    │  [Login]        │                         │
│                    │                 │                         │
│                    │  [Forgot Password?]                       │
│                    │                 │                         │
│                    │  Don't have an account? [Register]        │
│                    └─────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Register Page
```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  [Logo] DFM Stock Site  [Home]  [About]  [Contact]             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────────┐                         │
│                    │   REGISTER      │                         │
│                    ├─────────────────┤                         │
│                    │                 │                         │
│                    │  Full Name:     │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  Email:         │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  Password:      │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  Confirm:       │                         │
│                    │  [___________]  │                         │
│                    │                 │                         │
│                    │  [I agree to Terms]                       │
│                    │                 │                         │
│                    │  [Register]     │                         │
│                    │                 │                         │
│                    │  Already have an account? [Login]         │
│                    └─────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 User Journey Flows

### New User Journey
```
Landing Page → Browse Stocks → View Stock Details → 
Register Account → Set Up Watchlist → Regular Usage
```

### Returning User Journey
```
Login → Dashboard → Check Watchlist → Market Overview → 
Stock Research → Update Preferences
```

### Power User Journey
```
Login → Advanced Analysis → Portfolio Tracking → 
News Monitoring → Data Export → Community Features
```

---

## 📱 Mobile Navigation

### Mobile Menu Structure
```
┌─────────────────┐
│  ☰ Menu         │
├─────────────────┤
│  🏠 Home        │
│  📊 Stocks      │
│  📈 Market      │
│  ⭐ Watchlist   │
│  📰 News        │
│  👤 Profile     │
│  🔐 Login       │
└─────────────────┘
```

### Mobile-Specific Features
- **Swipe Navigation** between stock list and details
- **Pull to Refresh** for real-time data updates
- **Touch Gestures** for chart interactions
- **Bottom Navigation** for quick access to main sections
- **Responsive Tables** with horizontal scroll
- **Collapsible Sections** to save screen space

---

## 🎨 Design System

### Color Scheme
- **Primary:** #2563eb (Blue)
- **Secondary:** #64748b (Gray)
- **Success:** #10b981 (Green)
- **Danger:** #ef4444 (Red)
- **Warning:** #f59e0b (Yellow)
- **Background:** #ffffff (Light) / #1f2937 (Dark)

### Typography
- **Headings:** Inter, sans-serif
- **Body:** Inter, sans-serif
- **Arabic:** Noto Sans Arabic

### Icons
- **Navigation:** Heroicons
- **Charts:** Custom SVG icons
- **Status:** Material Design Icons

### Spacing
- **Base Unit:** 4px
- **Container Padding:** 16px (mobile) / 24px (desktop)
- **Section Spacing:** 32px (mobile) / 48px (desktop)

This navigation map provides a comprehensive overview of the user interface and user experience flow for the DFM Stock Site, ensuring intuitive navigation and optimal user engagement. 