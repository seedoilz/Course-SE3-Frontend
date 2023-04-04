import request from '@/network/request'
let API = require('@/apis')

export const analyzeText = (data) => request._post(API.ANALYZE_BASIC, data)
export const analyzeFile = (data) => request._post(API.ANALYZE_FILE, data)
