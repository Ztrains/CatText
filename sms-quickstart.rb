require 'rubygems'
require 'twilio-ruby'
require 'sinatra'
require 'httparty'

enable :sessions


def get_url
	url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'
	response = HTTParty.get(url)
	pic = response.parsed_response['response']['data']['images']['image'].first
	url = pic.last
	return url
end

get '/sms-quickstart' do
	
	session[:step] = 0 if params['Body'] == "Clear"
	session[:name] = nil if params['Body'] == 'Clear'

	session[:step] ||= 0 
	session[:step] += 1

  twiml = Twilio::TwiML::Response.new do |r|
    if params['Body'].downcase.include? 'send cats'
    	r.Message do |message|
    		message.Media get_url
    		message.Body "Thanks for texting in to CatPics! You can always reply with \'another\' to get more! Or, tell me how the cat looked!"
    	end
    elsif params['Body'].downcase.include? 'another'
    	session[:step] = 0
    	
    	r.Message do |message|
    		message.Media get_url
    		message.Body "Here's another, reply with another again to get more! Or, tell me how the cat looked!"
    	end
    elsif session[:step] == 1
    	#session[:city] = params['FromCity']
    	#session[:phonenumber] = params['From']
    	
    	if session[:name] == nil
    		r.Message "Thanks for sharing. What's your name?"
    	else
    		r.Message "Thanks for sharing, #{session[:name]}.  Say \'another\' to get more pictures if you'd like."
    		session[:step] == 2
    	end
    elsif session[:step] == 2
    	#session[:name] = params['Body']

    	if session[:name] == nil
    		session[:name] = params['Body']
    	end

    	r.Message "Nice to meet you #{session[:name]}, unfortunately from this number I only send out cat pictures. You can always reply with \'another\' to see more cats!"
    else
    	#session[:body] = params['Body']

    	r.Message "Hi again, #{session[:name]}, but if you remember I can't reply back to you. Sorry! You can always reply with \'another\' to see more cats, however!"
    end
  end
  twiml.text
end