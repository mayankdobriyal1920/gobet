--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.0

-- Started on 2025-01-15 13:04:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: getbet
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO getbet;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: getbet
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: app_user; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.app_user (
    id text NOT NULL,
    name text,
    phone_number text NOT NULL,
    profile_url text,
    otp text,
    password character varying,
    sub_admin text,
    wallet_balance integer,
    role smallint DEFAULT 3,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    game_balance integer DEFAULT 0
);


ALTER TABLE public.app_user OWNER TO getbet;

--
-- TOC entry 220 (class 1259 OID 16450)
-- Name: bet_prediction_history; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.bet_prediction_history (
    id integer NOT NULL,
    amount integer NOT NULL,
    user_id text NOT NULL,
    bet_id text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    option_name character varying,
    game_type character varying,
    min integer,
    status integer,
    betting_active_users_id integer
);


ALTER TABLE public.bet_prediction_history OWNER TO getbet;

--
-- TOC entry 219 (class 1259 OID 16449)
-- Name: bet_prediction_history_id_seq; Type: SEQUENCE; Schema: public; Owner: getbet
--

CREATE SEQUENCE public.bet_prediction_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bet_prediction_history_id_seq OWNER TO getbet;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 219
-- Name: bet_prediction_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getbet
--

ALTER SEQUENCE public.bet_prediction_history_id_seq OWNED BY public.bet_prediction_history.id;


--
-- TOC entry 224 (class 1259 OID 16470)
-- Name: betting_active_users; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.betting_active_users (
    id integer NOT NULL,
    user_id text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    status integer DEFAULT 1
);


ALTER TABLE public.betting_active_users OWNER TO getbet;

--
-- TOC entry 223 (class 1259 OID 16469)
-- Name: betting_active_users_id_seq; Type: SEQUENCE; Schema: public; Owner: getbet
--

CREATE SEQUENCE public.betting_active_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.betting_active_users_id_seq OWNER TO getbet;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 223
-- Name: betting_active_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getbet
--

ALTER SEQUENCE public.betting_active_users_id_seq OWNED BY public.betting_active_users.id;


--
-- TOC entry 222 (class 1259 OID 16460)
-- Name: betting_percentage; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.betting_percentage (
    id integer NOT NULL,
    amount integer NOT NULL,
    user_id text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.betting_percentage OWNER TO getbet;

--
-- TOC entry 221 (class 1259 OID 16459)
-- Name: betting_percentage_id_seq; Type: SEQUENCE; Schema: public; Owner: getbet
--

CREATE SEQUENCE public.betting_percentage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.betting_percentage_id_seq OWNER TO getbet;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 221
-- Name: betting_percentage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getbet
--

ALTER SEQUENCE public.betting_percentage_id_seq OWNED BY public.betting_percentage.id;


--
-- TOC entry 218 (class 1259 OID 16417)
-- Name: pass_code; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.pass_code (
    id integer NOT NULL,
    user_id text NOT NULL,
    code integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by text DEFAULT 1,
    allot_to text
);


ALTER TABLE public.pass_code OWNER TO getbet;

--
-- TOC entry 217 (class 1259 OID 16416)
-- Name: pass_code_id_seq; Type: SEQUENCE; Schema: public; Owner: getbet
--

CREATE SEQUENCE public.pass_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pass_code_id_seq OWNER TO getbet;

--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 217
-- Name: pass_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getbet
--

ALTER SEQUENCE public.pass_code_id_seq OWNED BY public.pass_code.id;


--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: sessions; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.sessions (
    sid text NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO getbet;

--
-- TOC entry 226 (class 1259 OID 16481)
-- Name: user_transaction_history; Type: TABLE; Schema: public; Owner: getbet
--

CREATE TABLE public.user_transaction_history (
    id integer NOT NULL,
    amount integer NOT NULL,
    user_id text NOT NULL,
    type text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_transaction_history OWNER TO getbet;

--
-- TOC entry 225 (class 1259 OID 16480)
-- Name: user_transection_history_id_seq; Type: SEQUENCE; Schema: public; Owner: getbet
--

CREATE SEQUENCE public.user_transection_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_transection_history_id_seq OWNER TO getbet;

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_transection_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: getbet
--

ALTER SEQUENCE public.user_transection_history_id_seq OWNED BY public.user_transaction_history.id;


--
-- TOC entry 3241 (class 2604 OID 16453)
-- Name: bet_prediction_history id; Type: DEFAULT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.bet_prediction_history ALTER COLUMN id SET DEFAULT nextval('public.bet_prediction_history_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 16473)
-- Name: betting_active_users id; Type: DEFAULT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.betting_active_users ALTER COLUMN id SET DEFAULT nextval('public.betting_active_users_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 16463)
-- Name: betting_percentage id; Type: DEFAULT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.betting_percentage ALTER COLUMN id SET DEFAULT nextval('public.betting_percentage_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 16420)
-- Name: pass_code id; Type: DEFAULT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.pass_code ALTER COLUMN id SET DEFAULT nextval('public.pass_code_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 16484)
-- Name: user_transaction_history id; Type: DEFAULT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.user_transaction_history ALTER COLUMN id SET DEFAULT nextval('public.user_transection_history_id_seq'::regclass);


--
-- TOC entry 3409 (class 0 OID 16398)
-- Dependencies: 215
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.app_user (id, name, phone_number, profile_url, otp, password, sub_admin, wallet_balance, role, created_at, game_balance) FROM stdin;
errsae92-5435345-gfgfg	Manmohan	9123456780	avatar-2	1234	\N	3213213-efgfd-435245	9000	3	2024-12-22 13:43:52.321965	0
542155-e04d3e2e-7978d1d0	krishna	7830717789	avatar-3	\N	\N	324qwe-536uyrt-546jhgj	0	3	2024-12-25 16:18:01.226	0
23349-4baeb0f4-d0a546ec	krishna	7830717827	avatar-3	\N	\N	324qwe-536uyrt-546jhgj	0	3	2024-12-26 14:06:58.461	0
272199-476b63ff-10f5e15c	krishna	8976543210	avatar-3	\N	\N	324qwe-536uyrt-546jhgj	0	3	2024-12-26 14:16:40.66	0
347343-c64c783a-e08ce0c2	krishna	9458320945	avatar-3	\N	\N	324qwe-536uyrt-546jhgj	0	3	2024-12-27 16:14:52.212	0
132te13-ef65gfd-gffgfgs	Neeraj Payal	9876543210	avatar-1	1234	\N	3213213-efgfd-435245	52000	3	2024-12-22 13:43:52.321965	12290
3213213-efgfd-435245	Mayank Dobriyal	7017935899	avatar-1	1234	\N	324qwe-536uyrt-546jhgj	100000	2	2024-12-22 13:43:52.321965	5288
672389-775bab30-5a7099a8	krishna Bhatti	7830717727	avatar-2	\N	\N	324qwe-536uyrt-546jhgj	70000	3	2024-12-25 13:48:12.257	40000
45486yhgf-gfhgfudf-ykhjgj	Nirmal Gaur	8123456780	avatar-5	1234	\N	3213213-efgfd-435245	10000	3	2024-12-22 13:43:52.321965	6000
435324-rtthyfgh-ljkhersf	Amit Negi	7123456780	avatar-6	1234	\N	3213213-efgfd-435245	14000	3	2024-12-22 13:43:52.321965	5000
324qwe-536uyrt-546jhgj	Sumit Rajput	1111111111	avatar-4	1234	\N	\N	55340	1	2024-12-22 13:43:52.321965	4000
\.


--
-- TOC entry 3414 (class 0 OID 16450)
-- Dependencies: 220
-- Data for Name: bet_prediction_history; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.bet_prediction_history (id, amount, user_id, bet_id, created_at, option_name, game_type, min, status, betting_active_users_id) FROM stdin;
3	100	3213213-efgfd-435245	2025010500100011598	2025-01-05 08:07:22.070263	SMALL	win_go	1	0	13
4	100	132te13-ef65gfd-gffgfgs	2025010500100011598	2025-01-05 08:07:22.070263	BIG	win_go	1	0	12
5	300	3213213-efgfd-435245	2025010500100011611	2025-01-05 08:20:26.96949	SMALL	win_go	1	0	15
6	300	132te13-ef65gfd-gffgfgs	2025010500100011611	2025-01-05 08:20:26.96949	BIG	win_go	1	0	14
7	2150	3213213-efgfd-435245	2025010500100011633	2025-01-05 08:42:25.549317	SMALL	win_go	1	0	23
8	2150	132te13-ef65gfd-gffgfgs	2025010500100011633	2025-01-05 08:42:25.549317	BIG	win_go	1	0	22
9	700	3213213-efgfd-435245	2025010500100011641	2025-01-05 08:50:22.310775	SMALL	win_go	1	0	25
10	700	132te13-ef65gfd-gffgfgs	2025010500100011641	2025-01-05 08:50:22.310775	BIG	win_go	1	0	24
11	450	3213213-efgfd-435245	20250105100010249	2025-01-05 09:38:40.537092	SMALL	win_go	1	0	27
12	450	132te13-ef65gfd-gffgfgs	20250105100010249	2025-01-05 09:38:40.537092	BIG	win_go	1	0	26
13	400	3213213-efgfd-435245	20250105100010585	2025-01-05 09:45:05.803436	SMALL	win_go	1	0	28
14	400	132te13-ef65gfd-gffgfgs	20250105100010585	2025-01-05 09:45:05.803436	BIG	win_go	1	0	29
15	1250	3213213-efgfd-435245	20250105100010601	2025-01-05 10:01:22.381576	SMALL	win_go	1	0	31
16	1250	132te13-ef65gfd-gffgfgs	20250105100010601	2025-01-05 10:01:22.381576	BIG	win_go	1	0	30
17	4250	3213213-efgfd-435245	20250105100010617	2025-01-05 10:17:00.357573	SMALL	win_go	1	0	34
18	4250	132te13-ef65gfd-gffgfgs	20250105100010617	2025-01-05 10:17:00.357573	BIG	win_go	1	0	32
19	450	3213213-efgfd-435245	20250105100010626	2025-01-05 10:25:00.737633	SMALL	win_go	1	0	36
20	450	132te13-ef65gfd-gffgfgs	20250105100010626	2025-01-05 10:25:00.737633	BIG	win_go	1	0	35
21	200	132te13-ef65gfd-gffgfgs	20250105100010635	2025-01-05 10:34:00.12671	SMALL	win_go	1	0	37
22	200	3213213-efgfd-435245	20250105100010635	2025-01-05 10:34:00.12671	BIG	win_go	1	0	38
\.


--
-- TOC entry 3418 (class 0 OID 16470)
-- Dependencies: 224
-- Data for Name: betting_active_users; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.betting_active_users (id, user_id, created_at, status) FROM stdin;
37	132te13-ef65gfd-gffgfgs	2025-01-05 10:32:31.116353	4
38	3213213-efgfd-435245	2025-01-05 10:32:32.60249	4
39	3213213-efgfd-435245	2025-01-05 12:33:25.195365	4
8	132te13-ef65gfd-gffgfgs	2025-01-05 07:02:16.164254	4
9	132te13-ef65gfd-gffgfgs	2025-01-05 07:46:24.19883	4
10	132te13-ef65gfd-gffgfgs	2025-01-05 07:57:14.440416	4
11	132te13-ef65gfd-gffgfgs	2025-01-05 08:00:16.957572	4
12	132te13-ef65gfd-gffgfgs	2025-01-05 08:05:22.050057	4
13	3213213-efgfd-435245	2025-01-05 08:05:26.7619	4
14	132te13-ef65gfd-gffgfgs	2025-01-05 08:18:26.957921	4
15	3213213-efgfd-435245	2025-01-05 08:18:35.323484	4
40	3213213-efgfd-435245	2025-01-06 07:33:27.724848	4
16	132te13-ef65gfd-gffgfgs	2025-01-05 08:32:23.523785	4
18	3213213-efgfd-435245	2025-01-05 08:33:26.310519	4
19	132te13-ef65gfd-gffgfgs	2025-01-05 08:35:46.849785	4
21	3213213-efgfd-435245	2025-01-05 08:37:07.991147	4
41	132te13-ef65gfd-gffgfgs	2025-01-13 05:05:36.181331	4
42	3213213-efgfd-435245	2025-01-14 04:53:38.404782	2
43	672389-775bab30-5a7099a8	2025-01-14 04:53:44.593064	2
44	672389-775bab30-5a7099a8	2025-01-14 04:53:54.186683	2
22	132te13-ef65gfd-gffgfgs	2025-01-05 08:40:25.466995	4
23	3213213-efgfd-435245	2025-01-05 08:40:34.86271	4
45	672389-775bab30-5a7099a8	2025-01-14 04:54:01.422893	2
46	672389-775bab30-5a7099a8	2025-01-14 04:54:08.306668	2
24	132te13-ef65gfd-gffgfgs	2025-01-05 08:48:22.296912	4
25	3213213-efgfd-435245	2025-01-05 08:48:26.097318	4
26	132te13-ef65gfd-gffgfgs	2025-01-05 09:36:40.52479	4
27	3213213-efgfd-435245	2025-01-05 09:36:43.579555	4
49	3213213-efgfd-435245	2025-01-14 05:00:39.980396	2
47	672389-775bab30-5a7099a8	2025-01-14 04:57:31.630562	4
28	3213213-efgfd-435245	2025-01-05 09:44:05.793437	4
29	132te13-ef65gfd-gffgfgs	2025-01-05 09:44:09.1857	4
48	3213213-efgfd-435245	2025-01-14 04:57:34.041018	4
30	132te13-ef65gfd-gffgfgs	2025-01-05 09:59:22.393635	4
31	3213213-efgfd-435245	2025-01-05 09:59:26.31884	4
32	132te13-ef65gfd-gffgfgs	2025-01-05 10:15:07.337003	4
34	3213213-efgfd-435245	2025-01-05 10:16:08.06612	4
35	132te13-ef65gfd-gffgfgs	2025-01-05 10:23:16.727681	4
36	3213213-efgfd-435245	2025-01-05 10:23:19.993438	4
\.


--
-- TOC entry 3416 (class 0 OID 16460)
-- Dependencies: 222
-- Data for Name: betting_percentage; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.betting_percentage (id, amount, user_id, created_at) FROM stdin;
1	10	3213213-efgfd-435245	2025-01-04 08:11:21.196125
2	10	3213213-efgfd-435245	2025-01-04 08:15:47.726137
3	0	672389-775bab30-5a7099a8	2025-01-11 06:26:22.554068
4	0	672389-775bab30-5a7099a8	2025-01-11 06:27:41.963813
5	0	672389-775bab30-5a7099a8	2025-01-11 06:31:43.823535
6	0	672389-775bab30-5a7099a8	2025-01-11 06:45:59.457127
7	0	672389-775bab30-5a7099a8	2025-01-11 06:46:12.361849
8	0	672389-775bab30-5a7099a8	2025-01-11 07:05:46.680098
9	10	132te13-ef65gfd-gffgfgs	2025-01-13 04:41:24.857071
10	12	3213213-efgfd-435245	2025-01-14 04:52:12.237816
\.


--
-- TOC entry 3412 (class 0 OID 16417)
-- Dependencies: 218
-- Data for Name: pass_code; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.pass_code (id, user_id, code, created_at, created_by, allot_to) FROM stdin;
2	324qwe-536uyrt-546jhgj	1234	2024-12-25 11:44:09.004798	3213213-efgfd-435245	\N
1	324qwe-536uyrt-546jhgj	1235	2024-12-25 11:44:09.004798	3213213-efgfd-435245	672389-775bab30-5a7099a8
4	324qwe-536uyrt-546jhgj	1237	2024-12-25 11:44:09.004798	3213213-efgfd-435245	542155-e04d3e2e-7978d1d0
3	324qwe-536uyrt-546jhgj	1236	2024-12-25 11:44:09.004798	3213213-efgfd-435245	23349-4baeb0f4-d0a546ec
6	324qwe-536uyrt-546jhgj	1239	2024-12-25 11:44:09.004798	3213213-efgfd-435245	\N
5	324qwe-536uyrt-546jhgj	1238	2024-12-25 11:44:09.004798	3213213-efgfd-435245	272199-476b63ff-10f5e15c
8	324qwe-536uyrt-546jhgj	1241	2024-12-25 11:44:09.004798	3213213-efgfd-435245	\N
7	324qwe-536uyrt-546jhgj	1240	2024-12-25 11:44:09.004798	3213213-efgfd-435245	347343-c64c783a-e08ce0c2
\.


--
-- TOC entry 3410 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.sessions (sid, sess, expire) FROM stdin;
xAQgXXRNXdD1ys1HE59XyC-uq-5RGy1d	{"cookie": {"path": "/", "secure": false, "expires": "2026-01-12T14:34:12.240Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "672389-775bab30-5a7099a8", "name": "krishna", "role": 3, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-1", "phone_number": "7830717727", "wallet_balance": 70}}	2026-01-12 14:34:16+00
win8iq-alBTrr62TRi6V36zVjCL0Wz-A	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T08:20:12.825Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 08:20:13+00
_pKwOsS2u5vFtauLGHkqdrVzi35VgCnS	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T09:02:32.962Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 09:02:33+00
p76x61oAkTGEAGNQZtboYNHNqQvdk9HL	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T09:22:11.632Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 09:22:12+00
hUTTafHWpNI-e-EKj3ZcRI4oDZ8vZ0BA	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T09:34:28.385Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 09:34:29+00
hMSh7jQW0iS-WVxc7dounmPgec3T0V2i	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:04:09.420Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:04:10+00
hsHi7coR1QRB3xaUJ8eL4kmXF1fCKAna	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:27:28.186Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:27:29+00
PsxSI8Udw8Xrdj41qxH4rOUqce3mjsWP	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:30:06.165Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:30:07+00
HmBiqg4u7W6LlNBNkbFiQSWESraffYXS	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:31:42.396Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:31:43+00
SHvikAPXMGWOnxywx_-7dIfM-g4qEta8	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:32:01.791Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:32:02+00
VK4trQG4HWjViVFfdqPuD6fNtWsdoZdi	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-25T10:33:01.560Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:33:02+00
Fv9Ysr8rTV49JHK2PaypTFhQeJSkusbl	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-25T10:37:44.535Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 10:37:45+00
FBxtSh9l_bSn9spMddjHYTHOq8vXrhha	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-25T11:02:54.872Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 11:02:55+00
edvAGNUI3eebZGYxyCWzslyWeszKqAUZ	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-25T11:03:02.649Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2025-12-25 11:03:03+00
QWVZWMst4wuQPFHY5snNCfI1cZ9vYtK3	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-25T11:09:58.805Z", "httpOnly": true, "sameSite": "none", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-3", "phone_number": "7017935899", "wallet_balance": 2000}}	2026-01-11 15:33:22+00
wjo6mmu8krcvv9DKCGgjVn5hGP34H0NL	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-28T16:57:16.845Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "672389-775bab30-5a7099a8", "name": "krishna", "role": 3, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-2", "phone_number": "7830717727", "wallet_balance": 0}}	2026-01-12 08:54:31+00
6LUvD-Pd5NNDsdlVaJXFsc_icYb_ScjK	{"cookie": {"path": "/", "secure": false, "expires": "2026-01-12T16:29:53.451Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 31536000000}, "userSessionData": {"id": "672389-775bab30-5a7099a8", "name": "krishna Bhatt", "role": 3, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-1", "phone_number": "7830717727", "wallet_balance": 70}}	2026-01-12 16:38:42+00
zW-AW9qH67v7By8f-Uq6LiecdAuZnZgh	{"cookie": {"path": "/", "secure": true, "expires": "2026-01-14T04:51:21.860Z", "httpOnly": true, "sameSite": "none", "originalMaxAge": 31536000000}, "userSessionData": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-1", "phone_number": "7017935899", "wallet_balance": 19000}}	2026-01-14 05:01:00+00
9vuXLQJ6eqqjOpJjpL6q4v2qYWluMzlL	{"cookie": {"path": "/", "secure": true, "expires": "2026-01-14T04:51:30.748Z", "httpOnly": true, "sameSite": "none", "originalMaxAge": 31536000000}, "userSessionData": {"id": "672389-775bab30-5a7099a8", "name": "krishna Bhatt", "role": 3, "sub_admin": {"id": "324qwe-536uyrt-546jhgj", "name": "Sumit Rajput", "role": 1, "phone_number": "1111111111", "profile_picture": "avatar-4"}, "profile_url": "avatar-2", "phone_number": "7830717727", "wallet_balance": 70}}	2026-01-14 05:05:33+00
ND3AEcEY4jydHGpgZLlf6jhPZNgwTnTK	{"cookie": {"path": "/", "secure": true, "expires": "2026-01-05T04:43:27.399Z", "httpOnly": true, "sameSite": "none", "originalMaxAge": 31536000000}, "userSessionData": {"id": "132te13-ef65gfd-gffgfgs", "name": "Neeraj Payal", "role": 3, "sub_admin": {"id": "3213213-efgfd-435245", "name": "Mayank Dobriyal", "role": 2, "phone_number": "7017935899", "profile_picture": "avatar-6"}, "profile_url": "avatar-1", "phone_number": "9876543210", "wallet_balance": 3000}}	2026-01-15 07:02:39+00
\.


--
-- TOC entry 3420 (class 0 OID 16481)
-- Dependencies: 226
-- Data for Name: user_transaction_history; Type: TABLE DATA; Schema: public; Owner: getbet
--

COPY public.user_transaction_history (id, amount, user_id, type, created_at) FROM stdin;
1	10	3213213-efgfd-435245	game_percentage_deduct	2025-01-04 08:15:47.731117
2	550	3213213-efgfd-435245	game_play_deduct	2025-01-05 05:44:26.880593
3	550	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 05:44:26.880593
4	100	3213213-efgfd-435245	game_play_deduct	2025-01-05 08:07:22.083642
5	100	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 08:07:22.083642
6	300	3213213-efgfd-435245	game_play_deduct	2025-01-05 08:20:26.994988
7	300	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 08:20:26.994988
8	2150	3213213-efgfd-435245	game_play_deduct	2025-01-05 08:42:25.554156
9	2150	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 08:42:25.554156
10	700	3213213-efgfd-435245	game_play_deduct	2025-01-05 08:50:22.325435
11	700	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 08:50:22.325435
12	450	3213213-efgfd-435245	game_play_deduct	2025-01-05 09:38:40.555793
13	450	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 09:38:40.555793
14	400	3213213-efgfd-435245	game_play_deduct	2025-01-05 09:45:05.817298
15	400	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 09:45:05.817298
16	1250	3213213-efgfd-435245	game_play_deduct	2025-01-05 10:01:22.396904
17	1250	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 10:01:22.396904
18	4250	3213213-efgfd-435245	game_play_deduct	2025-01-05 10:17:00.365001
19	4250	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 10:17:00.365001
20	450	3213213-efgfd-435245	game_play_deduct	2025-01-05 10:25:00.742146
21	450	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 10:25:00.742146
22	200	132te13-ef65gfd-gffgfgs	game_play_deduct	2025-01-05 10:34:00.145508
23	200	3213213-efgfd-435245	game_play_deduct	2025-01-05 10:34:00.145508
24	13	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 06:26:22.243895
25	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 06:26:22.8844
26	10	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 06:27:41.632438
27	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 06:27:42.283795
28	5	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 06:31:43.508614
29	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 06:31:44.135508
30	10	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 06:45:59.065559
31	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 06:45:59.816776
32	11	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 06:46:11.958389
33	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 06:46:12.784221
34	9	672389-775bab30-5a7099a8	wallet_to_game_wallet_transfer	2025-01-11 07:05:46.280837
35	0	672389-775bab30-5a7099a8	game_percentage_deduct	2025-01-11 07:05:47.079923
36	1000	132te13-ef65gfd-gffgfgs	wallet_to_game_wallet_transfer	2025-01-13 04:41:24.853952
37	10	132te13-ef65gfd-gffgfgs	game_percentage_deduct	2025-01-13 04:41:24.8599
38	1200	3213213-efgfd-435245	wallet_to_game_wallet_transfer	2025-01-14 04:52:12.235124
39	12	3213213-efgfd-435245	game_percentage_deduct	2025-01-14 04:52:12.241914
\.


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 219
-- Name: bet_prediction_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getbet
--

SELECT pg_catalog.setval('public.bet_prediction_history_id_seq', 22, true);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 223
-- Name: betting_active_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getbet
--

SELECT pg_catalog.setval('public.betting_active_users_id_seq', 49, true);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 221
-- Name: betting_percentage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getbet
--

SELECT pg_catalog.setval('public.betting_percentage_id_seq', 10, true);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 217
-- Name: pass_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getbet
--

SELECT pg_catalog.setval('public.pass_code_id_seq', 8, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_transection_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: getbet
--

SELECT pg_catalog.setval('public.user_transection_history_id_seq', 39, true);


--
-- TOC entry 3251 (class 2606 OID 16408)
-- Name: app_user app_user_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_phone_number_key UNIQUE (phone_number);


--
-- TOC entry 3253 (class 2606 OID 16406)
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);


--
-- TOC entry 3259 (class 2606 OID 16458)
-- Name: bet_prediction_history bet_prediction_history_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.bet_prediction_history
    ADD CONSTRAINT bet_prediction_history_pkey PRIMARY KEY (id);


--
-- TOC entry 3263 (class 2606 OID 16479)
-- Name: betting_active_users betting_active_users_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.betting_active_users
    ADD CONSTRAINT betting_active_users_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16468)
-- Name: betting_percentage betting_percentage_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.betting_percentage
    ADD CONSTRAINT betting_percentage_pkey PRIMARY KEY (id);


--
-- TOC entry 3257 (class 2606 OID 16426)
-- Name: pass_code pass_code_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.pass_code
    ADD CONSTRAINT pass_code_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 16415)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- TOC entry 3265 (class 2606 OID 16489)
-- Name: user_transaction_history user_transection_history_pkey; Type: CONSTRAINT; Schema: public; Owner: getbet
--

ALTER TABLE ONLY public.user_transaction_history
    ADD CONSTRAINT user_transection_history_pkey PRIMARY KEY (id);


-- Completed on 2025-01-15 13:04:45

--
-- PostgreSQL database dump complete
--

