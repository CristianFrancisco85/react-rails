class Friend < ApplicationRecord
  belongs_to :user1, class_name: "Users"
  belongs_to :user2, class_name: "Users"
end
