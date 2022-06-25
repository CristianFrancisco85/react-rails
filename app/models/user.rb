class User < ApplicationRecord
    has_many :publications,
    has_many :friends,
end
