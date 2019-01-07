# poker
Poker game

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 合约地址
https://kylin.eosx.io/account/myeosgame111?mode=contract&sub=tables&table=bet&lowerBound=&upperBound=&limit=100

# 扑克素材
http://www.58pic.com/newpic/10185276.html

# 赔率
enum bet_type_enum : int8_t {
DRAGON_WIN = 1, // 龙赢
DRAGON_EVEN = 2, // 龙双
DRAGON_ODD = 3, // 龙单
DRAGON_BLACK = 4, // 龙黑
DRAGON_RED = 5, // 龙红
SAME = 6,
TIGER_WIN = 7, // 虎赢
TIGER_EVEN = 8, // 虎双
TIGER_ODD = 9, // 虎单
TIGER_BLACK = 10, // 虎黑
TIGER_RED = 11, // 虎红
};

static const map<int,int> wins_map = { 
{ DRAGON_WIN, 100 },
{ DRAGON_EVEN, 105 },
{ DRAGON_ODD, 75 },
{ DRAGON_BLACK, 90 },
{ DRAGON_RED, 90 },

{ SAME, 800 },

{ TIGER_WIN, 100 },
{ TIGER_EVEN, 105 },
{ TIGER_ODD, 75 },
{ TIGER_BLACK, 90 },
{ TIGER_RED, 90 },
};

# 所有扑克牌
/ static vector<string> card_value = {"2","3","4","5","6","7","8","9","10","J","Q","K","A"};
// static vector<string> card_color = {"", "黑桃", "红桃", "樱花", "方片"};
static vector<int> cards = {100,101,102,103,104,105,106,107,108,109,110,111,112,
200,201,202,203,204,205,206,207,208,209,210,211,212,
300,301,302,303,304,305,306,307,308,309,310,311,312,
400,401,402,403,404,405,406,407,408,409,410,411,412
}; // 所有得扑克牌 

// static vector<string> card_value = {"2","3","4","5","6","7","8","9","10","J","Q","K","A"};
// static vector<string> card_color = {"", "黑桃", "红桃", "樱花", "方片"};
static vector<int> cards = {999, // 这个999是无效数据，占用位置0
100,101,102,103,104,105,106,107,108,109,110,111,112,
200,201,202,203,204,205,206,207,208,209,210,211,212,
300,301,302,303,304,305,306,307,308,309,310,311,312,
400,401,402,403,404,405,406,407,408,409,410,411,412
}; // 所有得扑克牌

302 就代表 樱花 4