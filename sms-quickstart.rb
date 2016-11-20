require 'rubygems'
require 'twilio-ruby'
require 'sinatra'

get '/sms-quickstart' do
  twiml = Twilio::TwiML::Response.new do |r|
    r.Message "Sorry, but I won't respond from this number, I only send cat pictures!"
  end
  twiml.text
end