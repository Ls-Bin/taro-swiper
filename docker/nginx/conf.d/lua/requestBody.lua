

function requestTo()
    ngx.req.set_header("Content-Type", "application/json;charset=utf8");
    ngx.req.set_header("Accept", "application/json");
    local uri = ngx.re.sub(ngx.var.uri, "^/es/(.*)", "$1");
    local resp
        resp = ngx.location.capture("/lua/"..uri, arry)
    --local res
    --if(resp.status == 200 or resp.status ==201) then
    --    res = resp.body
    --    ngx.say(res)
    --else
    --    res = "Upstream server err : " ..resp.status
    --    ngx.say(res)
    --end
    ngx.log(ngx.INFO,"uri: ",ngx.var.uri)
    ngx.log(ngx.INFO,"body: ",arry['body'])
    ngx.log(ngx.INFO,"resp: ",resp.body)
    ngx.say(resp.body)

end

-- 处理主函数
function main_func()
    ngx.req.read_body()
    local action = ngx.var.request_method
    if(action == "POST") then
        args = ngx.req.get_post_args()
        arry = {method = ngx.HTTP_POST, always_forward_body=true}


        -- get转发为post请求
    elseif(action == "GET") then
        local json =  require "json"
        args = ngx.req.get_uri_args()
        arry = {method = ngx.HTTP_POST, body =json.encode(ngx.req.get_uri_args()) ,args = ""}
    end

    requestTo()

end


main_func()
